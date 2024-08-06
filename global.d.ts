// global.d.ts
interface Window {
    Snipcart: {
        store: {
            getState: () => {
                cart: {
                    items: {
                        count: number;
                    };
                };
            };
        };
    };
}
