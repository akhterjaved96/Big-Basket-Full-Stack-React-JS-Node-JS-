import * as productActions from './product.actions';
import {createSlice} from "@reduxjs/toolkit";

export const PRODUCT_FEATURE = "productFeature";

let initialState = {
    loading: false,
    errorMessage: null,
    productList: [],
    product: {}
};
export const productsSlice = createSlice({
    name: 'productsSlice',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Get all Products
        builder.addCase(productActions.getAllProducts.pending, (state) => {
            state.loading = true;
        }).addCase(productActions.getAllProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.productList = action.payload;
        }).addCase(productActions.getAllProducts.rejected, (state, action) => {
            state.loading = false;
            state.errorMessage = "Fetching data from server Failed!"
        })

            // Get a Product
            .addCase(productActions.getProduct.pending, (state) => {
                state.loading = true;
            }).addCase(productActions.getProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.product = action.payload;
        }).addCase(productActions.getProduct.rejected, (state, action) => {
            state.loading = false;
            state.errorMessage = "Fetching data from server Failed!"
        })

            // Create a Product
            .addCase(productActions.createProduct.pending, (state) => {
                state.loading = true;
            }).addCase(productActions.createProduct.fulfilled, (state, action) => {
            state.loading = false;
        }).addCase(productActions.createProduct.rejected, (state, action) => {
            state.loading = false;
            state.errorMessage = "Create Product is Failed!"
        })

            // Update a Product
            .addCase(productActions.updateProduct.pending, (state) => {
                state.loading = true;
            }).addCase(productActions.updateProduct.fulfilled, (state, action) => {
            state.loading = false;
        }).addCase(productActions.updateProduct.rejected, (state, action) => {
            state.loading = false;
            state.errorMessage = "Update Product is Failed!"
        })

            // Delete a Product
            .addCase(productActions.deleteProduct.pending, (state) => {
                state.loading = true;
            }).addCase(productActions.deleteProduct.fulfilled, (state, action) => {
            state.loading = false;
        }).addCase(productActions.deleteProduct.rejected, (state, action) => {
            state.loading = false;
            state.errorMessage = "Delete Product is Failed!"
        })
    }
});