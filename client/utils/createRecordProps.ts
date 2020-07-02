const createRecordProps = ({
  id,
  product,
  location,
  price,
  quantity,
  unit,
}) => {
  return {
    id,
    product,
    location,
    price,
    quantity,
    unit,
  }
};

export default createRecordProps;
