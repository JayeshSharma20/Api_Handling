import React, { Fragment } from 'react'
import DataTable from 'react-data-table-component';

const Table = (props) => {
    const {
        data,
        columns
    } = props
  return (
    <Fragment >
      <DataTable
      columns ={columns}
      data={data}
      // className='data-table-head-light table-responsive'
      />
    </Fragment>
  )
}

export default Table
