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
  const [data, handleFieldChange, setData] = useForm(DEFAULT_DATA);
  const [focusNameFieldState, focusNameField] = useToggle();

  const nameField = useRef(null);

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
              { name: 'Corr/Forn.', length: '[Corr/Forn.'.length }, // Ajuste para incluir o ':' na contagem
              { name: 'Qtd.', length: '[Qtd.'.length }, // Ajuste para incluir o ':' na contagem
              { name: 'Local/Carreg.', length: '[Local/Carreg.'.length }, // Ajuste para incluir o ':' na contagem
              { name: 'NF.', length: '[NF.'.length }, // Ajuste para incluir o ':' na contagem
              { name: 'Prod.', length: '[Prod.'.length }, // Ajuste para incluir o ':' na contagem
            ];

            let nextFieldPosition = -1;
            let nextIndex = -1;
            for (let i = 0; i < fields.length; i++) {
              const field = fields[i];
              const nextPosition = data.name.indexOf(field.name, currentPosition);
              if (nextPosition !== -1 && nextPosition >= currentPosition) {
                if (nextFieldPosition === -1 || nextPosition < nextFieldPosition) {
                  nextFieldPosition = nextPosition + field.length;
                  nextIndex = i;
                }
              }
            }

            if (nextFieldPosition !== -1) {
              current.ref.current.setSelectionRange(nextFieldPosition, nextFieldPosition);
            } else if (nextIndex !== -1) {
              // Se não houver próxima posição, volte para o início
              current.ref.current.setSelectionRange(0, 0);
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
