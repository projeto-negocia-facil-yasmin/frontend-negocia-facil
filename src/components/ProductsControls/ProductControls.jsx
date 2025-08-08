import styles from "./ProductControls.module.css";

function ProductControls({ search, onSearchChange, onAddClick }) {
  return (
    <div className={styles.controlsContainer}>
      <input
        type="text"
        placeholder="Buscar"
        className={styles.searchInput}
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <button className={styles.addButton} onClick={onAddClick}>
        Cadastrar Novo Produto
      </button>
    </div>
  );
}

export default ProductControls;