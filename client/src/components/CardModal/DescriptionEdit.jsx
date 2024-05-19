import React, { useCallback, useImperativeHandle, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Button, Form } from 'semantic-ui-react';
import SimpleMDE from 'react-simplemde-editor';

import styles from './DescriptionEdit.module.scss';

const DEFAULT_FIELDS = {
  VLR_TOTAL_DO_FRETE: '{VLR TOTAL DO FRETE: }   ',
  VLR_DO_FRETE_TON: '{VLR DO FRETE TON.: }   ',
  TOTAL_COMPRADO: '{TOTAL COMPRADO: }   ',
  TOTAL_RECEBIDO: '{TOTAL RECEBIDO: }   ',
  PESO_DE_ORIGEM: '{PESO DE ORIGEM: }   ',
  PESO_DE_CHEGADA: '{PESO DE CHEGADA: }   ',
};

const DescriptionEdit = React.forwardRef(({ children, defaultValue, onUpdate }, ref) => {
  const [t] = useTranslation();
  const [isOpened, setIsOpened] = useState(false);
  const [value, setValue] = useState(null);
  const editorRef = useRef(null);

  const open = useCallback(() => {
    setIsOpened(true);
    const initialValue = defaultValue || '';
    const preaddedFields = Object.values(DEFAULT_FIELDS).join('');
    setValue(`${preaddedFields}\n${initialValue}`);
  }, [defaultValue, setValue]);

  const close = useCallback(() => {
    const cleanValue = value.trim() || null;

    if (cleanValue !== defaultValue) {
      onUpdate(cleanValue);
    }

    setIsOpened(false);
    setValue(null);
  }, [defaultValue, onUpdate, value, setValue]);

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

  const handleFieldKeyDown = useCallback(
    (event) => {
      if (event.ctrlKey && event.key === 'Enter') {
        close();
      }
    },
    [close],
  );

  const handleSubmit = useCallback(() => {
    close();
  }, [close]);

  useEffect(() => {
    if (editorRef.current) {
      // Definir a posição do cursor após o componente ser montado
      editorRef.current.codemirror.focus();
      editorRef.current.codemirror.setCursor({ line: 0, ch: 18 }); // Linha 0, caractere 18
    }
  }, []);

  const mdEditorOptions = {
    autofocus: true,
    spellChecker: false,
    status: false,
    toolbar: [
      'bold',
      'italic',
      'heading',
      'strikethrough',
      '|',
      'quote',
      'unordered-list',
      'ordered-list',
      'table',
      '|',
      'link',
      'image',
      '|',
      'undo',
      'redo',
      '|',
      'guide',
    ],
  };

  if (!isOpened) {
    return React.cloneElement(children, {
      onClick: handleChildrenClick,
    });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <SimpleMDE
        ref={editorRef}
        value={value}
        options={mdEditorOptions}
        placeholder={t('common.enterDescription')}
        className={styles.field}
        onKeyDown={handleFieldKeyDown}
        onChange={setValue}
      />
      <div className={styles.controls}>
        <Button positive content={t('action.save')} />
      </div>
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
