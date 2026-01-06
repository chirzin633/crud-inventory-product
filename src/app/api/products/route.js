// app/api/products/route.js
import { query } from '@/lib/db'
import { validateProduct } from '@/utils/validation'

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url)
        const page = Number(searchParams.get('page')) || 1
        const limit = Number(searchParams.get('limit')) || 5 // Default 5 sesuai pagination
        const search = searchParams.get('search') || "";

        const finalPage = parseInt(page, 10);
        const finalLimit = parseInt(limit, 10);
        const offset = parseInt((finalPage - 1) * finalLimit);
        // const offset = Math.max(0, (page - 1) * limit);

        // Build base query
        let baseQuery = 'SELECT * FROM products';
        let countQuery = 'SELECT COUNT(*) as total FROM products';
        const queryParams = [];

        // Add search condition if exists
        if (search) {
            const searchCondition = ' WHERE product_name LIKE ?';
            const searchParam = `%${search}%`;

            baseQuery += searchCondition;
            countQuery += searchCondition;
            queryParams.push(searchParam);
        }

        // Add ordering
        baseQuery += ' ORDER BY created_at DESC';

        // Add pagination
        baseQuery += ' LIMIT ? OFFSET ?';

        // Get total count with search condition
        const countResult = await query(countQuery, [...queryParams])
        const total = countResult[0]?.total || 0
        const totalPages = Math.ceil(total / limit)

        // Get paginated products with search condition
        const products = await query(
            baseQuery,
            [...queryParams, finalLimit, offset]
        )

        return Response.json({
            success: true,
            data: products || [],
            pagination: {
                page: finalPage,
                limit: finalLimit,
                total,
                totalPages: totalPages || 1
            }
        })
    } catch (error) {
        console.error('Error in GET /api/products:', error)
        return Response.json(
            {
                success: false,
                error: error.message,
                data: []
            },
            { status: 500 }
        )
    }
}

export async function POST(req) {
    try {
        const data = await req.json()

        // Validate input
        const validation = validateProduct(data)
        if (!validation.isValid) {
            return Response.json(
                { success: false, errors: validation.errors },
                { status: 400 }
            )
        }

        const result = await query(
            'INSERT INTO products (product_name, amount, qty) VALUES (?, ?, ?)',
            [data.product_name?.trim(), data.amount, data.qty]
        )

        return Response.json({
            success: true,
            message: 'Product created successfully',
            id: result.insertId
        })
    } catch (error) {
        console.error('Error in POST /api/products:', error)
        return Response.json(
            { success: false, error: error.message },
            { status: 500 }
        )
    }
}