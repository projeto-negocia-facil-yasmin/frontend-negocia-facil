import { toast } from "react-hot-toast";
import ProductControls from "../../components/ProductsControls/ProductControls";
import ProductForm from "../../components/ProductForm/ProductForm";
import ProductList from "../../components/ProductList/ProductList";
import { ProductAPI } from "../../services/ProductAPI";
import "../../App.css";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const data = await ProductAPI.getAll();

      let resolved = [];
      if (Array.isArray(data)) {
        resolved = data;
      } else if (data && Array.isArray(data.content)) {
        resolved = data.content;
      } else {
        console.warn("Formato inesperado de produtos recebido:", data);
      }

      setProducts(resolved);
    } catch (error) {
      toast.error(error.message);
    }
  }

  const handleSave = async (product) => {
    try {
      let savedProduct;
      if (product.id) {
        savedProduct = await ProductAPI.update(product.id, product);
        setProducts((prev) =>
          prev.map((p) => (p.id === savedProduct.id ? savedProduct : p))
        );
        toast.success("Produto atualizado com sucesso!");
      } else {
        savedProduct = await ProductAPI.create(product);
        setProducts((prev) => [...prev, savedProduct]);
        toast.success("Produto criado com sucesso!");
      }
      setShowForm(false);
      setEditingProduct(null);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Deseja excluir este produto?");
    if (!confirm) return;

    try {
      await ProductAPI.delete(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      toast.success("Produto removido com sucesso!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleEdit = (product) => {
    const productForEdit = {
      ...product,
      category: product.category
        ? (typeof product.category === "object" ? product.category : { id: product.category })
        : null,
    };

    setEditingProduct(productForEdit);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  const filtered = Array.isArray(products)
    ? products.filter((p) =>
      (p.title || "").toLowerCase().includes(search.toLowerCase())
    )
    : [];

  return (
    <div className="main-content">
      {!showForm ? (
        <>
          <ProductControls
            searchValue={search}
            onSearchChange={setSearch}
            onAddClick={() => {
              setEditingProduct(null);
              setShowForm(true);
            }}
          />
          <ProductList
            products={filtered}
            onEdit={handleEdit}
            onDelete={handleDelete}
            showMenuOptions={true}
            showTrashButton={false}
          />
        </>
      ) : (
        <ProductForm
          productToEdit={editingProduct}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}

export default ProductsPage;