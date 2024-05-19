import React, { useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import TextareaAutosize from 'react-textarea-autosize';
import { Button, Form, TextArea } from 'semantic-ui-react';
import { useDidUpdate, useToggle } from '../../lib/hooks';
import { useClosableForm, useForm } from '../../hooks';
import styles from './CardAdd.module.scss';

const DEFAULT_DATA = {
  name: '[Prod.:] [Corr/Forn.:] [Qtd.:] [Local/Carreg.:] [NF.:]', // Texto pré-adicionado
};

const CardAdd = React.memo(({ isOpened, onCreate, onClose }) => {
  const [t] = useTranslation();
  const [data, setData] = useForm(DEFAULT_DATA);
  const [focusNameFieldState, focusNameField] = useToggle();

  const nameField = useRef(null);
  const prevDataRef = useRef(data.name);

  const submit = useCallback(
    (autoOpen) => {
      const cleanData = {
        ...data,
        name: data.name.trim(),
      };

      if (!cleanData.name) {
        nameField.current.ref.current.select();
        return;
      }

      onCreate(cleanData, autoOpen);
      setData(DEFAULT_DATA);

      if (autoOpen) {
        onClose();
      } else {
        focusNameField();
      }
    },
    [onCreate, onClose, data, setData, focusNameField],
  );

  const handleFieldChange = useCallback(
    (event) => {
      const { selectionStart, selectionEnd } = event.target;
      const { value } = event.target;

      // Verifica se houve tentativa de apagar algum conteúdo entre ':' e ']'
      const prev = prevDataRef.current;
      if (
        value.substring(0, selectionStart) !== prev.substring(0, selectionStart) ||
        value.substring(selectionEnd) !== prev.substring(selectionEnd)
      ) {
        // Se houver, reverte a mudança
        setData({ name: prev });
        return;
      }

      setData({ name: value });
      prevDataRef.current = value;
    },
    [setData],
  );

  const handleFieldKeyDown = useCallback(
    (event) => {
      switch (event.key) {
        case 'Enter': {
          event.preventDefault();

          const autoOpen = event.ctrlKey;
          submit(autoOpen);

          break;
        }
        case 'Escape': {
          onClose();

          break;
        }
        case 'Tab': {
          event.preventDefault();

          const { current } = nameField;
          if (current && current.ref && current.ref.current) {
            const currentPosition = current.ref.current.selectionStart;

            // Definição dos campos e suas posições
            const fields = [
              { name: 'Corr/Forn.', length: '[Corr/Forn.'.length },
              { name: 'Qtd.', length: '[Qtd.'.length },
              { name: 'Local/Carreg.', length: '[Local/Carreg.'.length },
              { name: 'NF.', length: '[NF.'.length },
            ];

            let nextFieldPosition = -1;
            for (let i = 0; i < fields.length; i++) {
              const field = fields[i];
              const nextPosition = data.name.indexOf(field.name, currentPosition);
              if (nextPosition !== -1 && nextPosition >= currentPosition) {
                nextFieldPosition = nextPosition + field.length;
                break;
              }
            }

            if (nextFieldPosition !== -1) {
              current.ref.current.setSelectionRange(nextFieldPosition, nextFieldPosition);
            }
          }

          break;
        }
        default:
      }
    },
    [onClose, submit, data.name],
  );

  const [handleFieldBlur, handleControlMouseOver, handleControlMouseOut] = useClosableForm(onClose);

  const handleSubmit = useCallback(() => {
    submit();
  }, [submit]);

  useEffect(() => {
    if (isOpened) {
      const { current } = nameField;
      if (current && current.ref && current.ref.current) {
        current.ref.current.focus();
        // Posicionar o cursor entre o ":" e o "]" no campo "[Prod.:]"
        const position = '[Prod.:'.length;
        current.ref.current.setSelectionRange(position, position);
      }
    }
  }, [isOpened]);

  useDidUpdate(() => {
    const { current } = nameField;
    if (current && current.ref && current.ref.current) {
      current.ref.current.focus();
      // Posicionar o cursor entre o ":" e o "]" no campo "[Prod.:]"
      const position = '[Prod.:'.length;
      current.ref.current.setSelectionRange(position, position);
    }
  }, [focusNameFieldState]);

  return (
    <Form
      className={classNames(styles.wrapper, !isOpened && styles.wrapperClosed)}
      onSubmit={handleSubmit}
    >
      <div className={styles.fieldWrapper}>
        <TextArea
          ref={nameField}
          as={TextareaAutosize}
          name="name"
          value={data.name}
          placeholder={t('common.enterCardTitle')}
          minRows={3}
          spellCheck={false}
          className={styles.field}
          onKeyDown={handleFieldKeyDown}
          onChange={handleFieldChange}
          onBlur={handleFieldBlur}
        />
      </div>
      <div className={styles.controls}>
        {/* eslint-disable-next-line jsx-a11y/mouse-events-have-key-events */}
        <Button
          positive
          content={t('action.addCard')}
          className={styles.submitButton}
          onMouseOver={handleControlMouseOver}
          onMouseOut={handleControlMouseOut}
        />
      </div>
    </Form>
  );
});

CardAdd.propTypes = {
  isOpened: PropTypes.bool.isRequired,
  onCreate: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CardAdd;
