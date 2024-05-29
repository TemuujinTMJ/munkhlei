'use client'
import styles from './RadioSwitch.module.css';

const RadioSwitch = ({isChecked, setIsChecked}) => {

  return (
    <label className={styles.switch}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => setIsChecked(!isChecked)}
      />
      <span className={styles.slider}></span>
    </label>
  );
};

export default RadioSwitch;
