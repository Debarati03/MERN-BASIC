import { create } from "zustand";
import API_URL from '../config/api.js';

export const useProductStore = create((set) => ({
	products: [],
	setProducts: (products) => set({ products }),
	createProduct: async (newProduct) => {
		if (!newProduct.name || !newProduct.image || !newProduct.price) {
			return { success: false, message: "Please fill in all fields." };
		}
		const res = await fetch(`${API_URL}/products`, {
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
		try {
			const res = await fetch(`${API_URL}/products`);
			const data = await res.json();
			set({ products: data.data });
		} catch (error) {
			console.error('Error fetching products:', error);
		}
	},
	deleteProduct: async (pid) => {
		const res = await fetch(`${API_URL}/products/${pid}`, {
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
		  const res = await fetch(`${API_URL}/products/${pid}`, {
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