import { NextRequest, NextResponse } from 'next/server';
import { PrintfulClient } from 'printful-request';

const printful = new PrintfulClient(process.env.PRINTFUL_API_KEY!);

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop(); // Correctly retrieve the ID from the URL path
    const storeId = process.env.PRINTFUL_STORE_ID;

    try {
        if (!storeId) {
            throw new Error("Missing store_id environment variable");
        }

        console.log(`Fetching product details for ID: ${id}`);

        // Assuming store_id needs to be part of the request body for some Printful API endpoints
        const { result: { sync_product, sync_variants } } = await printful.get(`store/products/${id}`, {
            store_id: storeId,
        });

        const [variant] = sync_variants;
        const product = {
            id: sync_product.id,
            name: sync_product.name,
            image: variant.files.find((file: any) => file.type === 'preview')?.preview_url,
            price: variant.retail_price,
            description: sync_product.description,
        };
        return NextResponse.json(product);
    } catch (error) {
        console.error('Error fetching product details from Printful:', error);
        return NextResponse.json({ error: 'Failed to fetch product details' }, { status: 500 });
    }
}
