import { Suspense } from 'react';
import type { Metadata } from 'next';
import ProductsClient from './ProductsClient';

export const metadata: Metadata = {
  title: 'Product catalogue — United Supply Agency',
  description: 'Thirty-five railway relay components across six families: springs, fasteners, sheet-metal parts, connectors, LAMTUF cards and moulded parts.',
};

export default function ProductsPage() {
  return (
    <Suspense fallback={null}>
      <ProductsClient />
    </Suspense>
  );
}
