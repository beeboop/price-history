import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import classNames from 'classnames';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Card from './Card';
import createRecordProps from '../utils/createRecordProps';
import withAuth from './isAuthed';

const ALL_RECORDS = gql`
  {
    records(orderBy: { date: desc }) {
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

export default withAuth(function CardsContainer() {
  const classes = useStyles();
  const [selectedRecords, setSelectedRecords] = React.useState(new Set());
  const { loading, error, data } = useQuery(ALL_RECORDS);
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
  if (error) return <p>Error...</p>;

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
});
