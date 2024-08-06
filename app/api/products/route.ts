import { NextResponse } from 'next/server';
import { PrintfulClient } from 'printful-request';

const printful = new PrintfulClient(process.env.PRINTFUL_API_KEY!);

export async function GET() {
    try {
        const storeId = process.env.PRINTFUL_STORE_ID;
        if (!storeId) {
            throw new Error("Missing store_id environment variable");
        }

        // Fetch all product IDs for the store
        const { result: productIds } = await printful.get(`store/products`, {
            store_id: storeId,
        });

        const allProducts = await Promise.all(
            productIds.map(async ({ id }: { id: string }) => {
                const { result: { sync_product, sync_variants } } = await printful.get(`store/products/${id}`, {
                    store_id: storeId,
                });
                const [variant] = sync_variants;
                return {
                    id: sync_product.id,
                    name: sync_product.name,
                    image: variant.files.find((file: any) => file.type === 'preview')?.preview_url,
                    price: variant.retail_price,
                };
            })
        );
        return NextResponse.json(allProducts);
    } catch (error) {
        console.error('Error fetching products from Printful:', error);
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }
}
