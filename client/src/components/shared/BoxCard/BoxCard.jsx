import styles from "./BoxCard.module.scss";
import { ReactComponent as Box } from "../../../assets/icons/Box.svg";
import { Link } from "react-router-dom";

const BoxCard = ({
  type,
  uuid,
  selectedBox,
  setSelectedBox,
  link,
  name,
  macAddress,
}) => {
  return (
    <article
      className={styles.container}
      onClick={() => type === "selection" && setSelectedBox(uuid)}
    >
      <Box className={styles.icon} />
      {type === "configuration" && (
        <>
          <span className={styles.text}>{macAddress}</span>
          <Link to={`/devices/${uuid && uuid}/configure`} className="button">
            Configurer
          </Link>
        </>
      )}
      {type === "assign" && (
        <>
          <span className={styles.text}>{macAddress}</span>
          <Link to={`/devices/${uuid}/configure`} className="button">
            Configurer
          </Link>
        </>
      )}

      {type === "selection" && (
        <>
          <span className={styles.text}>{name}</span>
          <div className={`button ${selectedBox === uuid && styles.selected}`}>
            {selectedBox === uuid ? "Sélectionnée" : "Sélectionner"}
          </div>
        </>
      )}
      {type === "link" && (
        <>
          <span className={styles.text}>{name}</span>
          <Link to={link} className="button">
            Voir
          </Link>
        </>
      )}
    </article>
  );
};

export default BoxCard;
