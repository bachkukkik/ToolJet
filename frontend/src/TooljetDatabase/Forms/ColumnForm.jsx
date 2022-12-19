import React, { useState, useContext } from 'react';
import Select from '@/_ui/Select';
import DrawerFooter from '@/_ui/Drawer/DrawerFooter';
import { isEmpty } from 'lodash';
import { toast } from 'react-hot-toast';
import { tooljetDatabaseService } from '@/_services';
import { TooljetDatabaseContext } from '../index';
import { dataTypes } from '../constants';

const ColumnForm = ({ onCreate, onEdit, onClose, selectedColumn }) => {
  const [columnName, setColumnName] = useState('');
  const [defaultValue, setDefaultValue] = useState('');
  const [dataType, setDataType] = useState();
  const { organizationId, selectedTable } = useContext(TooljetDatabaseContext);

  const handleTypeChange = (value) => {
    setDataType(value);
  };

  const handleCreate = async () => {
    if (isEmpty(columnName)) {
      toast.error('Column name cannot be empty');
      return;
    }
    if (isEmpty(dataType)) {
      toast.error('Data type cannot be empty');
      return;
    }

    const { error } = await tooljetDatabaseService.createColumn(
      organizationId,
      selectedTable,
      columnName,
      dataType,
      defaultValue
    );
    if (error) {
      toast.error(error?.message ?? `Failed to create a new column in "${selectedTable}" table`);
      return;
    }

    toast.success(`Column created successfully`);
    onCreate && onCreate();
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Create a new column</h3>
      </div>
      <div className="card-body">
        <div className="mb-3">
          <div className="form-label">Column name</div>
          <input
            value={columnName}
            type="text"
            placeholder="Enter column name"
            className="form-control"
            autoComplete="off"
            onChange={(e) => setColumnName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <div className="form-label">Data type</div>
          <Select
            useMenuPortal={false}
            placeholder="Select data type"
            value={dataType}
            options={dataTypes}
            onChange={handleTypeChange}
          />
        </div>
        <div className="mb-3">
          <div className="form-label">Default value</div>
          <input
            value={defaultValue}
            type="text"
            placeholder="Enter default value"
            className="form-control"
            autoComplete="off"
            onChange={(e) => setDefaultValue(e.target.value)}
            disabled={dataType === 'serial'}
          />
        </div>
      </div>
      <DrawerFooter onClose={onClose} onCreate={handleCreate} />
    </div>
  );
};

export default ColumnForm;
