import React, { useCallback, useImperativeHandle, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Button, Form, Input } from 'semantic-ui-react';

import styles from './DescriptionEdit.module.scss';

const DEFAULT_FIELDS = {
  VLR_TOTAL_DO_FRETE: 'VLR TOTAL DO FRETE',
  VLR_DO_FRETE_TON: 'VLR DO FRETE TON.',
  TOTAL_COMPRADO: 'TOTAL COMPRADO',
  TOTAL_RECEBIDO: 'TOTAL RECEBIDO',
  PESO_DE_ORIGEM: 'PESO DE ORIGEM',
  PESO_DE_CHEGADA: 'PESO DE CHEGADA',
};

const DescriptionEdit = React.forwardRef(({ children, defaultValue, onUpdate }, ref) => {
  const [t] = useTranslation();
  const [isOpened, setIsOpened] = useState(false);
  const [values, setValues] = useState({ ...defaultValue });

  const open = useCallback(() => {
    setIsOpened(true);
  }, []);

  const close = useCallback(() => {
    setIsOpened(false);
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      open,
      close,
    }),
    [open, close],
  );

  const handleChildrenClick = useCallback(() => {
    if (!getSelection().toString()) {
      open();
    }
  }, [open]);

  const handleFieldChange = useCallback((e, { name, value }) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback(() => {
    onUpdate(values);
    close();
  }, [onUpdate, values, close]);

  const renderInputFields = useMemo(() => {
    return Object.entries(DEFAULT_FIELDS).map(([key, value]) => (
      <Form.Field
        key={key}
        control={Input}
        name={key}
        label={value}
        value={values[key] || ''}
        onChange={handleFieldChange}
      />
    ));
  }, [values, handleFieldChange]);

  if (!isOpened) {
    return React.cloneElement(children, {
      onClick: handleChildrenClick,
    });
  }

  return (
    <Form onSubmit={handleSubmit}>
      {renderInputFields}
      <Form.Field control={Button} positive content={t('action.save')} />
    </Form>
  );
});

DescriptionEdit.propTypes = {
  children: PropTypes.element.isRequired,
  defaultValue: PropTypes.object,
  onUpdate: PropTypes.func.isRequired,
};

DescriptionEdit.defaultProps = {
  defaultValue: {},
};

export default React.memo(DescriptionEdit);
