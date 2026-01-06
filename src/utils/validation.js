export function validateProduct(data) {
    const errors = {};

    if (!data.product_name || data.product_name.trim() === '') {
        errors.product_name = 'Product name is required';
    } else if (data.product_name.length > 255) {
        errors.product_name = 'Product name must be less than 255 characters';
    }

    if (!data.amount || data.amount <= 0) {
        errors.amount = 'Amount must be greater than 0';
    }

    if (!data.qty || data.qty < 0) {
        errors.qty = 'Quantity must be 0 or greater';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    }
}