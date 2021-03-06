import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import classes from "./index.module.scss";
import CmsSettingsModalProps from "./props";
import {
  addOption,
  deleteOption,
  editOption,
} from "../../../../store/actions/adminActions";

const Modal = ({
  isOpen,
  onRequestClose,
  partOptionsArray,
  partOptionIndex,
  language,
}: CmsSettingsModalProps) => {
  // STATE
  const [editLtValue, setEditLtValue] = useState("");
  const [editEnValue, setEditEnValue] = useState("");
  const [editIndex, setEditIndex] = useState(0);
  const [ltValue, setLtValue] = useState("");
  const [enValue, setEnValue] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    setEditLtValue(
      language.lt.partOptions[partOptionsArray[partOptionIndex].id].options[
        editIndex
      ].value
    );
    setEditEnValue(
      language.en.partOptions[partOptionsArray[partOptionIndex].id].options[
        editIndex
      ].value
    );
  }, [editIndex, partOptionIndex]);

  const _onHeaderClick = (event: any) => {
    event.stopPropagation();
  };

  const addHandler = () => {
    if (!ltValue || !enValue) {
    } else {
      const body = {
        option: partOptionsArray[partOptionIndex].id,
        ltValue,
        enValue,
      };
      dispatch(addOption(body));
      setEditIndex(0);
      setLtValue("");
      setEnValue("");
    }
  };
  const deleteHandler = () => {
    const body = {
      option: partOptionsArray[partOptionIndex].id,
      partOptionIndex: editIndex,
    };
    dispatch(deleteOption(body));
    setEditIndex(0);
  };

  const editHandler = () => {
    const body = {
      option: partOptionsArray[partOptionIndex].id,
      partOptionIndex: editIndex,
      ltValue: editLtValue,
      enValue: editEnValue,
    };
    dispatch(editOption(body));
    setEditIndex(0);
  };

  if (!isOpen) return null;
  return (
    <React.Fragment>
      <div
        className={classes.overlay}
        onClick={() => {
          onRequestClose();
        }}
      >
        <div className={classes.modal} onClick={_onHeaderClick}>
          <div
            onClick={() => {
              onRequestClose();
            }}
          ></div>
          <h2 className={classes.modalTitle}>Redagavimo meniu</h2>
          <div className={classes.Select}>
            <div className={classes.nauji}>
              <select
                name=""
                id=""
                value={editIndex}
                onChange={(e) => {
                  setEditIndex(parseInt(e.currentTarget.value));
                }}
              >
                {partOptionsArray[partOptionIndex].options.map(
                  (option: { value: string }, index: number) => {
                    return (
                      <option key={index} value={index}>
                        {option.value}
                      </option>
                    );
                  }
                )}
              </select>
              <p>lt</p>
              <input
                className={classes.inputModul}
                type="text"
                value={editLtValue}
                onChange={(e) => setEditLtValue(e.currentTarget.value)}
              />
              <p>en</p>
              <input
                className={classes.inputModul}
                type="text"
                value={editEnValue}
                onChange={(e) => setEditEnValue(e.currentTarget.value)}
              />

              <button
                className={classes.buttonAdd}
                onClick={(e) => editHandler()}
              >
                Redaguoti
              </button>
              <button
                className={classes.buttonDelete}
                onClick={(e) => deleteHandler()}
              >
                Trinti
              </button>
            </div>

            <div className={classes.esami}>
              <h4>Pridėti naują</h4>
              <p>lt</p>
              <input
                className={classes.inputModul}
                type="text"
                value={ltValue}
                onChange={(e) => setLtValue(e.currentTarget.value)}
              />
              <p>en</p>
              <input
                className={classes.inputModul}
                type="text"
                value={enValue}
                onChange={(e) => setEnValue(e.currentTarget.value)}
              />

              <button
                className={classes.buttonAdd}
                onClick={(e) => addHandler()}
              >
                Pridėti
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Modal;
