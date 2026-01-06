import { query } from "@/lib/db";
import { validateProduct } from "@/utils/validation";

export async function GET(req, { params }) {
    try {

        const id = params.id;
        const productId = parseInt(id);

        if (isNaN(productId)) {
            return Response.json(
                { success: false, error: 'Invalid product ID' },
                { status: 400 }
            );
        }

        const product = await query('SELECT * FROM products WHERE id = ?', [productId]);

        if (product.length === 0) {
            return Response.json(
                { success: false, error: 'Product not found' },
                { status: 404 }
            );
        }
        return Response.json({ success: true, data: product[0] });

    } catch (error) {
        console.error('Error in GET /api/products/[id]:', error);
        return Response.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}

export async function PUT(req, context) {
    try {

        const rawContext = context.params;
        const params = await rawContext;
        const id = params.id;

        const productId = parseInt(id);

        const data = await req.json();

        if (isNaN(productId)) {
            return Response.json(
                { success: false, error: 'Invalid product ID' },
                { status: 400 }
            );
        }

        // validasi input input
        const validation = validateProduct(data);
        if (!validation.isValid) {
            return Response.json(
                { success: false, errors: validation.errors },
                { status: 400 }
            );
        }

        const result = await query(
            'UPDATE products SET product_name = ?, amount = ?, qty = ? WHERE id = ?', [data.product_name.trim(), data.amount, data.qty, productId]
        );

        if (result.affectedRows === 0) {
            return Response.json(
                { success: false, error: 'Product not found' },
                { status: 404 }
            );
        }

        return Response.json({
            success: true,
            message: 'Product updated successfully'
        });
    } catch (error) {
        return Response.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}

export async function DELETE(req, context) {
    try {
        const rawContext = context.params;
        const params = await rawContext;
        const id = params.id;
        const productId = parseInt(id);

        if (isNaN(productId)) {
            return Response.json(
                { success: false, error: 'Invalid product ID' },
                { status: 400 }
            )
        }

        const result = await query('DELETE FROM products WHERE id = ?', [productId]);

        if (result.affectedRows === 0) {
            return Response.json(
                { success: false, error: 'Product not found' },
                { status: 404 }
            );
        }

        return Response.json({
            success: true,
            message: 'Product deleted successfully'
        });
    } catch (error) {
        return Response.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}