import { create } from "zustand";

export const useProductStore = create((set) => ({
	products: [],
	setProducts: (products) => set({ products }),
	createProduct: async (newProduct) => {
		if (!newProduct.name || !newProduct.image || !newProduct.price) {
			return { success: false, message: "Please fill in all fields." };
		}
		const res = await fetch("http://localhost:5000/api/products", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newProduct),
		});
		const data = await res.json();
		set((state) => ({ products: [...state.products, data.data] }));
		return { success: true, message: "Product created successfully" };
	},
	fetchProducts: async () => {
		const res = await fetch("http://localhost:5000/api/products");
		const data = await res.json();
		set({ products: data.data });
	},
	deleteProduct: async (pid) => {
		const res = await fetch(`http://localhost:5000/api/products/${pid}`, {
			method: "DELETE",
		});
		const data = await res.json();
		if (!data.success) return { success: false, message: data.message };

		// update the ui immediately, without needing a refresh
		set((state) => ({ products: state.products.filter((product) => product._id !== pid) }));
		return { success: true, message: data.message };
	},
	updateProduct: async (pid, updatedProduct) => {
		try {
		  const res = await fetch(`http://localhost:5000/api/products/${pid}`, {
			method: "PUT",
			headers: {
			  "Content-Type": "application/json",
			},
			body: JSON.stringify(updatedProduct),
		  });
	
		  const data = await res.json();
		  console.log("Server response:", data);
	
		  if (!data.success) {
			return { success: false, message: data.message };
		  }
	
		  set((state) => {
			const newProducts = state.products.map((product) =>
			  product._id === pid ? { ...product, ...updatedProduct } : product
			);
			console.log("New products state:", newProducts);
			return { products: newProducts };
		  });
	
		  return { success: true, message: data.message };
		} catch (error) {
		  console.error("Error updating product:", error);
		  return { success: false, message: "Failed to update product" };
		}
	  },
}));