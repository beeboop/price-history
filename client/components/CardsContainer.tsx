import React from 'react';
import { useRouter } from 'next/router';
import { gql, useQuery, useMutation } from '@apollo/client';
import classNames from 'classnames';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Card from './Card';
import createRecordProps from '../utils/createRecordProps';
import { AUTH_TOKEN } from '../utils/constants';

const ALL_RECORDS = gql`
  query Records($filter: String) {
    records(
      orderBy: { date: desc }
      filter: $filter
    ) {
      id
      product
      location
      price
      quantity
      unit
      date
    }
  }
`;

const DELETE_RECORD = gql`
  mutation DeleteRecord($id: ID!) {
    deleteRecord(
      id: $id
    ) {
      success
      message
      record {
        id
      }
    }
  }
`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    selected: {
      backgroundColor: theme.palette.info.light,
      borderColor: theme.palette.info.main,
      borderWidth: 1,
    },
  })
);

type CardsContainerProps = {
  filter?: string;
};

export default function CardsContainer({
  filter
}: CardsContainerProps) {
  const router = useRouter();
  const classes = useStyles();
  const [selectedRecords, setSelectedRecords] = React.useState(new Set());
  const { loading, error, data } = useQuery(ALL_RECORDS, {
    variables: { filter },
  });
  const [deleteRecord] = useMutation(DELETE_RECORD);
  const handleRecordClick = id => () => {
    if(selectedRecords.size) {
      const newSet = new Set(selectedRecords);
      if (!selectedRecords.has(id)) {
        newSet.add(id);
        setSelectedRecords(newSet);
      } else {
        newSet.delete(id);
        setSelectedRecords(newSet);
      }
    }
  }
  const handleRecordLongPress = id => () => {
    if(!selectedRecords.size) {
      const newSet = new Set(selectedRecords);
      newSet.add(id);
      setSelectedRecords(newSet);
    } else {
      setSelectedRecords(new Set().add(id));
    }
  }
  const handleDelete = async () => {
    const deletes = Array.from(selectedRecords).map(id => deleteRecord({ variables: { id }}));
    await Promise.all(deletes);
    setSelectedRecords(new Set());
    setTimeout(() => location.reload(), 500);
  }

  if (loading) return <p>Loading...</p>;
  if (error) {
    if (error.message === 'jwt expired' || error.message === 'Not authenticated') {
      localStorage.removeItem(AUTH_TOKEN);
      if (router.pathname !== '/login') router.push('/login');
      return null;
    }
    return <p>{ `error: ${error.message}` }</p>;
  }

  return (
    <>
      {data.records.map(record => (
        <Card
          {...createRecordProps(record)}
          className={ classNames({ [classes.selected]: selectedRecords.has(record.id)}) }
          key={ record.id }
          onClick={ handleRecordClick(record.id) }
          onLongPress={ handleRecordLongPress(record.id) }
        />
      ))}
      {selectedRecords.size > 0 && <Button
        variant="contained"
        color="secondary"
        startIcon={<DeleteIcon />}
        onClick={ handleDelete }
      >
        Delete
      </Button>}
    </>
  );
};
