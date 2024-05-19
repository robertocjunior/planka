import React, { useCallback, useImperativeHandle, useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Button, Form, Input } from 'semantic-ui-react';
import styles from './DescriptionEdit.module.scss';

const DEFAULT_FIELDS = [
  'VLR_TOTAL_DO_FRETE',
  'VLR_DO_FRETE_TON',
  'TOTAL_COMPRADO',
  'TOTAL_RECEBIDO',
  'PESO_DE_ORIGEM',
  'PESO_DE_CHEGADA',
  'DESCRICAO', // Novo campo adicionado
];

const DescriptionEdit = React.forwardRef(({ children, defaultValue, onUpdate }, ref) => {
  const { t } = useTranslation();
  const [isOpened, setIsOpened] = useState(false);
  const [fields, setFields] = useState(() => {
    const initialFields = {};
    DEFAULT_FIELDS.forEach(key => {
      initialFields[key] = '';
    });
    return initialFields;
  });

  useEffect(() => {
    if (defaultValue) {
      const values = defaultValue.split('\n');
      const newFields = {};
      DEFAULT_FIELDS.forEach((key, index) => {
        newFields[key] = values[index] || '';
      });
      setFields(newFields);
    }
  }, [defaultValue]);

  const open = useCallback(() => {
    setIsOpened(true);
  }, []);

  const close = useCallback(() => {
    const cleanValues = Object.values(fields).map(value => value.trim());
    const cleanValue = cleanValues.join('\n') || null;

    if (cleanValue !== defaultValue) {
      onUpdate(cleanValue);
    }

    setIsOpened(false);
  }, [defaultValue, onUpdate, fields]);

  useImperativeHandle(ref, () => ({
    open,
    close,
  }), [open, close]);

  const handleChildrenClick = useCallback(() => {
    if (!getSelection().toString()) {
      open();
    }
  }, [open]);

  const handleFieldChange = useCallback((e, { name, value }) => {
    setFields(prevFields => ({
      ...prevFields,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback(() => {
    close();
  }, [close]);

  const renderInputFields = useMemo(() => {
    return DEFAULT_FIELDS.map(key => (
      <Form.Field
        key={key}
        control={Input}
        name={key}
        label={t(`fields.${key}`)}
        value={fields[key]}
        onChange={handleFieldChange}
      />
    ));
  }, [fields, handleFieldChange, t]);

  const renderFormattedFields = useMemo(() => {
    return DEFAULT_FIELDS.map(key => (
      <div key={key} className={styles.formattedField}>
        {t(`fields.${key}`)}: {fields[key] || ''}
        <br />
      </div>
    ));
  }, [fields, t]);

  if (!isOpened) {
    return (
      <div onClick={handleChildrenClick}>
        {renderFormattedFields}
      </div>
    );
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
