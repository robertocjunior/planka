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
  const [description, setDescription] = useState('');

  const open = useCallback(() => {
    setIsOpened(true);
    setDescription(defaultValue || '');
  }, [defaultValue, setDescription]);

  const close = useCallback(() => {
    const cleanValue = description.trim() || null;

    if (cleanValue !== defaultValue) {
      onUpdate(cleanValue);
    }

    setIsOpened(false);
    setDescription('');
  }, [defaultValue, onUpdate, description]);

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

  const handleSubmit = useCallback(() => {
    close();
  }, [close]);

  const renderInputFields = useMemo(() => {
    return Object.entries(DEFAULT_FIELDS).map(([key, value]) => (
      <Form.Field key={key} control={Input} name={key} label={value} disabled />
    ));
  }, []);

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
  defaultValue: PropTypes.string,
  onUpdate: PropTypes.func.isRequired,
};

DescriptionEdit.defaultProps = {
  defaultValue: undefined,
};

export default React.memo(DescriptionEdit);
