// scripts/posts.ts
// This file contains sample blog posts about tech and computer science.
// These posts can be used to seed the database for testing or development purposes.

const posts = [
  {
    title: "TypeScript 5.5+ Advanced Patterns: Type-Safe APIs That Scale",
    slug: "typescript-advanced-patterns-2025",
    content: `# TypeScript 5.5+ Advanced Patterns: Type-Safe APIs That Scale

TypeScript has evolved from a "nice-to-have" to mission-critical infrastructure. With 5.5's discriminated union improvements and const type parameters, we're entering an era of compile-time guarantees that eliminate entire classes of runtime errors.

## The Type System as Your Contract Layer

Modern TypeScript isn't about adding types—it's about encoding business logic into your type system. When your types accurately model your domain, impossible states become unrepresentable.

\`\`\`typescript
// Domain-driven type design
type PaymentStatus = 
  | { status: 'pending'; processingAt: Date }
  | { status: 'completed'; completedAt: Date; transactionId: string }
  | { status: 'failed'; failedAt: Date; reason: string; retryCount: number };

// The type system prevents invalid states
function processPayment(payment: PaymentStatus): void {
  switch (payment.status) {
    case 'pending':
      console.log(\`Processing started at \${payment.processingAt}\`);
      // TypeScript knows payment.transactionId doesn't exist here
      break;
    case 'completed':
      console.log(\`Transaction ID: \${payment.transactionId}\`);
      // All properties are correctly typed
      break;
    case 'failed':
      console.log(\`Failed: \${payment.reason}, Retries: \${payment.retryCount}\`);
      break;
  }
}
\`\`\`

## Branded Types for Domain Primitives

Stop passing raw strings everywhere. Branded types create nominal typing in a structural system.

\`\`\`typescript
type UserId = string & { readonly __brand: 'UserId' };
type Email = string & { readonly __brand: 'Email' };
type OrderId = string & { readonly __brand: 'OrderId' };

function createUserId(id: string): UserId {
  if (!id.match(/^USR-[0-9]{8}$/)) {
    throw new Error('Invalid UserId format');
  }
  return id as UserId;
}

function sendEmail(to: Email, subject: string): void {
  // Implementation
}

// Prevents mixing up IDs
const userId = createUserId('USR-12345678');
const email = 'user@example.com' as Email; // In production, validate

// This won't compile - type safety enforced
// sendEmail(userId, 'Hello'); // Error: UserId is not assignable to Email
\`\`\`

## Template Literal Types for API Routes

Build type-safe REST APIs where route parameters are validated at compile time.

\`\`\`typescript
type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type Route = \`/\${string}\`;
type RouteWithParams<T extends string> = T extends \`\${infer Start}:\${infer Param}/\${infer Rest}\`
  ? RouteWithParams<\`\${Start}\${Param}/\${Rest}\`>
  : T extends \`\${infer Start}:\${infer Param}\`
  ? Start
  : T;

// Extract parameters from route
type ExtractParams<T extends string> = 
  T extends \`\${infer _Start}:\${infer Param}/\${infer Rest}\`
    ? { [K in Param]: string } & ExtractParams<Rest>
    : T extends \`\${infer _Start}:\${infer Param}\`
    ? { [K in Param]: string }
    : {};

// Type-safe API client
class APIClient {
  get<T extends Route>(route: T, params: ExtractParams<T>): Promise<unknown> {
    const url = this.buildURL(route, params);
    return fetch(url).then(r => r.json());
  }

  private buildURL<T extends Route>(route: T, params: ExtractParams<T>): string {
    let url = route as string;
    for (const [key, value] of Object.entries(params)) {
      url = url.replace(\`:\${key}\`, value);
    }
    return url;
  }
}

const client = new APIClient();

// Compile-time error if params don't match route
client.get('/users/:userId/orders/:orderId', {
  userId: '123',
  orderId: '456'
}); // ✓ Valid

// client.get('/users/:userId/orders/:orderId', { userId: '123' }); // ✗ Error: missing orderId
\`\`\`

## Conditional Types for Framework-Level Abstractions

Build framework utilities that adapt to different input types.

\`\`\`typescript
type Awaited<T> = T extends Promise<infer U> ? U : T;

type InferReturnType<T> = T extends (...args: any[]) => infer R
  ? Awaited<R>
  : never;

// Smart query builder that infers result types
class QueryBuilder<T> {
  constructor(private tableName: string) {}

  where<K extends keyof T>(field: K, value: T[K]): this {
    // Implementation
    return this;
  }

  async execute(): Promise<T[]> {
    // Implementation
    return [] as T[];
  }
}

interface User {
  id: number;
  email: string;
  name: string;
  createdAt: Date;
}

const query = new QueryBuilder<User>('users')
  .where('email', 'test@example.com') // Autocomplete + type checking
  .where('id', 123);

// Result type is automatically inferred as Promise<User[]>
const users = await query.execute();
\`\`\`

## Recursive Types for Nested Structures

Handle deeply nested data with recursive type definitions.

\`\`\`typescript
type JSONValue = 
  | string 
  | number 
  | boolean 
  | null
  | JSONValue[]
  | { [key: string]: JSONValue };

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

interface Config {
  database: {
    host: string;
    port: number;
    credentials: {
      username: string;
      password: string;
    };
  };
  api: {
    timeout: number;
    retries: number;
  };
}

// Partial updates at any depth
const partialUpdate: DeepPartial<Config> = {
  database: {
    credentials: {
      password: 'new-password' // Only update password
    }
  }
};

// Immutable config
const immutableConfig: DeepReadonly<Config> = {
  database: {
    host: 'localhost',
    port: 5432,
    credentials: {
      username: 'admin',
      password: 'secret'
    }
  },
  api: {
    timeout: 5000,
    retries: 3
  }
};

// immutableConfig.database.port = 3000; // Error: readonly
\`\`\`

## Variance and Higher-Kinded Types

Understand covariance and contravariance for building flexible type systems.

\`\`\`typescript
// Covariant: Producer<T> (output position)
interface Producer<out T> {
  produce(): T;
}

// Contravariant: Consumer<T> (input position)
interface Consumer<in T> {
  consume(value: T): void;
}

// Invariant: Transformer<T> (both positions)
interface Transformer<in out T> {
  transform(value: T): T;
}

// Real-world example: Event handlers
type EventHandler<T> = (event: T) => void;

interface ClickEvent {
  type: 'click';
  x: number;
  y: number;
}

interface MouseEvent extends ClickEvent {
  button: number;
}

// Contravariance: can assign more general handler to specific event
const handleMouse: EventHandler<MouseEvent> = (e) => {
  console.log(e.x, e.y, e.button);
};

const handleClick: EventHandler<ClickEvent> = handleMouse; // Valid!
\`\`\`

## Performance Optimization Strategies

TypeScript compilation can be slow in large codebases. Optimize with these techniques:

### Project References
\`\`\`json
// tsconfig.json
{
  "compilerOptions": {
    "composite": true,
    "incremental": true,
    "tsBuildInfoFile": ".tsbuildinfo"
  },
  "references": [
    { "path": "./packages/shared" },
    { "path": "./packages/api" },
    { "path": "./packages/web" }
  ]
}
\`\`\`

### Type-Only Imports
\`\`\`typescript
// Prevents bundling unused code
import type { User, Order } from './types';
import { processOrder } from './services';

// Runtime import only for what's needed
export function handleCheckout(user: User, order: Order) {
  return processOrder(order);
}
\`\`\`

### Skip Library Checks
\`\`\`json
{
  "compilerOptions": {
    "skipLibCheck": true, // Skip type checking in node_modules
    "skipDefaultLibCheck": true
  }
}
\`\`\`

## Testing Type Definitions

Use type assertions to test your types themselves.

\`\`\`typescript
import { expectType } from 'tsd';

type ExtractId<T> = T extends { id: infer I } ? I : never;

interface User {
  id: number;
  name: string;
}

interface Product {
  id: string;
  price: number;
}

// Test type transformations
expectType<ExtractId<User>>(123); // Should be number
expectType<ExtractId<Product>>('abc'); // Should be string

// Test function signatures
function getUser(id: number): User {
  return { id, name: 'Test' };
}

expectType<User>(getUser(1));
// expectType<Product>(getUser(1)); // Should error
\`\`\`

## Real-World Case Study: Type-Safe State Machine

Combine everything into a production-ready state machine.

\`\`\`typescript
type State<TContext> = {
  context: TContext;
  matches<TState extends string>(state: TState): boolean;
  transition<TEvent>(event: TEvent): State<TContext>;
};

type Event<TType extends string, TPayload = void> = {
  type: TType;
} & (TPayload extends void ? {} : { payload: TPayload });

// Define states and events
type OrderState = 
  | 'CART'
  | 'PENDING_PAYMENT'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED';

type OrderEvent =
  | Event<'CHECKOUT', { paymentMethod: string }>
  | Event<'PAY'>
  | Event<'SHIP', { trackingNumber: string }>
  | Event<'DELIVER'>
  | Event<'CANCEL', { reason: string }>;

type OrderContext = {
  items: Array<{ id: string; quantity: number }>;
  total: number;
  paymentMethod?: string;
  trackingNumber?: string;
  cancelReason?: string;
};

class OrderStateMachine {
  private state: OrderState = 'CART';
  private context: OrderContext;

  constructor(initialContext: OrderContext) {
    this.context = initialContext;
  }

  transition(event: OrderEvent): void {
    switch (this.state) {
      case 'CART':
        if (event.type === 'CHECKOUT') {
          this.context.paymentMethod = event.payload.paymentMethod;
          this.state = 'PENDING_PAYMENT';
        }
        break;
      
      case 'PENDING_PAYMENT':
        if (event.type === 'PAY') {
          this.state = 'PROCESSING';
        } else if (event.type === 'CANCEL') {
          this.context.cancelReason = event.payload.reason;
          this.state = 'CANCELLED';
        }
        break;
      
      case 'PROCESSING':
        if (event.type === 'SHIP') {
          this.context.trackingNumber = event.payload.trackingNumber;
          this.state = 'SHIPPED';
        }
        break;
      
      case 'SHIPPED':
        if (event.type === 'DELIVER') {
          this.state = 'DELIVERED';
        }
        break;
    }
  }

  getState(): OrderState {
    return this.state;
  }

  getContext(): Readonly<OrderContext> {
    return this.context;
  }
}

// Usage
const machine = new OrderStateMachine({
  items: [{ id: 'prod-1', quantity: 2 }],
  total: 99.98
});

machine.transition({ type: 'CHECKOUT', payload: { paymentMethod: 'credit-card' } });
machine.transition({ type: 'PAY' });
machine.transition({ type: 'SHIP', payload: { trackingNumber: 'TRACK-123' } });

console.log(machine.getState()); // 'SHIPPED'
\`\`\`

## Tooling & IDE Integration

Maximize productivity with proper tooling:

- **ts-reset**: Improve built-in type definitions
- **type-fest**: Utility types for common patterns
- **zod**: Runtime validation that generates TypeScript types
- **tRPC**: End-to-end type safety for APIs

\`\`\`typescript
import { z } from 'zod';

// Schema defines both validation and types
const UserSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  age: z.number().min(18),
  role: z.enum(['user', 'admin', 'moderator'])
});

type User = z.infer<typeof UserSchema>;

function validateUser(data: unknown): User {
  return UserSchema.parse(data); // Throws if invalid
}

// Type-safe and validated at runtime
const user = validateUser({
  id: 1,
  email: 'user@example.com',
  age: 25,
  role: 'admin'
});
\`\`\`

## Migration Strategies for Legacy Codebases

Moving from JavaScript to TypeScript? Do it incrementally:

1. **Start with \`allowJs\` and \`checkJs\`**: Enable gradual adoption
2. **Use \`any\` strategically**: Don't let perfect be the enemy of good
3. **Generate types from runtime**: Use tools like quicktype for JSON schemas
4. **Focus on boundaries first**: Type your API contracts and public interfaces
5. **Leverage declaration files**: Create \`.d.ts\` files for untyped libraries

## Conclusion

TypeScript's type system is Turing-complete—you can compute anything at the type level. The patterns covered here form the foundation for building resilient, maintainable systems where entire categories of bugs are impossible.

Your types should tell a story about your domain. When they do, refactoring becomes fearless and onboarding becomes documentation.

What's your most complex TypeScript pattern? Drop it in the comments.`,
    excerpt: "Master advanced TypeScript patterns for 2025: branded types, template literals, conditional types, and real-world type-safe architectures that eliminate runtime errors.",
    author: "Goutam Singha",
    publishedAt: new Date("2025-08-15"),
    status: "published",
    tags: ["typescript-tag", "programming-tag"],
    categories: ["TypeScript", "API Development"],
    viewCount: 18500,
    createdAt: new Date("2025-08-10"),
    updatedAt: new Date("2025-08-15")
  },

  {
    title: "React Server Components Deep Dive: The Architecture Shift You Can't Ignore",
    slug: "react-server-components-architecture-2025",
    content: `# React Server Components Deep Dive: The Architecture Shift You Can't Ignore

React Server Components (RSC) aren't just a new feature—they're a paradigm shift that fundamentally changes how we build React applications. After two years in production at Meta, Vercel, and Shopify, the patterns are clear: RSC solves problems we didn't realize we had.

## The Mental Model Shift

Traditional React renders everything on the client. RSC splits your component tree between server and client based on data requirements, not arbitrary boundaries.

\`\`\`tsx
// app/dashboard/page.tsx - Server Component (default)
async function Dashboard() {
  // Direct database access - no API route needed
  const user = await db.user.findUnique({
    where: { id: session.userId },
    include: { preferences: true }
  });

  const metrics = await analytics.getMetrics(user.id);

  return (
    <div>
      <ServerMetrics data={metrics} />
      <ClientInteractiveChart data={metrics} />
    </div>
  );
}
\`\`\`

Key insight: Server Components never ship JavaScript to the browser. Zero. They render to a serialized format (RSC Payload) that client components hydrate.

## Composition Patterns

The power emerges from mixing server and client components strategically.

\`\`\`tsx
// Server Component - can import and render client components
import { Suspense } from 'react';
import ClientForm from './ClientForm'; // 'use client' directive
import { getProductData } from '@/lib/api';

export default async function ProductPage({ params }: { params: { id: string } }) {
  // Run in parallel
  const [product, relatedProducts] = await Promise.all([
    getProductData(params.id),
    getRelatedProducts(params.id)
  ]);

  return (
    <main>
      <h1>{product.name}</h1>
      <Suspense fallback={<FormSkeleton />}>
        <ClientForm productId={product.id} initialStock={product.stock} />
      </Suspense>
      <Suspense fallback={<div>Loading recommendations...</div>}>
        <RelatedProducts ids={relatedProducts} />
      </Suspense>
    </main>
  );
}
\`\`\`

### Client Components - The Use Cases

Add 'use client' only when you need:
- Event handlers (onClick, onChange)
- React hooks (useState, useEffect, useContext)
- Browser APIs (localStorage, window)
- Third-party interactive libraries

\`\`\`tsx
'use client';

import { useState } from 'react';
import { addToCart } from '@/actions/cart';

export default function ClientForm({ 
  productId, 
  initialStock 
}: { 
  productId: string; 
  initialStock: number 
}) {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await addToCart(productId, quantity);
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        max={initialStock}
      />
      <button disabled={loading}>
        {loading ? 'Adding...' : 'Add to Cart'}
      </button>
    </form>
  );
}
\`\`\`

## Server Actions: The Missing Piece

Server Actions enable client components to call server-side logic without API routes.

\`\`\`tsx
// app/actions/cart.ts
'use server';

import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db';

export async function addToCart(productId: string, quantity: number) {
  const session = await getSession();
  
  if (!session) {
    throw new Error('Unauthorized');
  }

  await db.cartItem.create({
    data: {
      userId: session.userId,
      productId,
      quantity
    }
  });

  // Revalidate the cart page to show updated data
  revalidatePath('/cart');
  
  return { success: true };
}

export async function updateQuantity(itemId: string, quantity: number) {
  await db.cartItem.update({
    where: { id: itemId },
    data: { quantity }
  });

  revalidatePath('/cart');
}
\`\`\`

Server Actions automatically handle:
- CSRF protection via secure tokens
- Request serialization/deserialization
- Error boundaries and loading states
- Progressive enhancement (works without JS!)

## Streaming and Suspense

RSC enables true streaming HTML—send the shell immediately, stream in data as it arrives.

\`\`\`tsx
import { Suspense } from 'react';

export default function ProductsPage() {
  return (
    <>
      <Header />
      <Suspense fallback={<ProductListSkeleton />}>
        <ProductList />
      </Suspense>
      <Suspense fallback={<ReviewsSkeleton />}>
        <Reviews />
      </Suspense>
      <Footer />
    </>
  );
}

async function ProductList() {
  // Slow database query
  const products = await db.product.findMany({
    where: { featured: true },
    include: { images: true, reviews: true }
  });

  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

async function Reviews() {
  // Even slower third-party API
  const reviews = await fetch('https://reviews-api.com/latest', {
    next: { revalidate: 300 } // Cache for 5 minutes
  }).then(r => r.json());

  return <ReviewsList reviews={reviews} />;
}
\`\`\`

The browser receives HTML progressively:
1. Header, Footer, and loading skeletons render immediately (FCP < 500ms)
2. ProductList streams in when database query completes
3. Reviews stream in when API responds
4. Total blocking time: ~0ms

## Data Fetching Patterns

### Parallel Fetching
\`\`\`tsx
async function Dashboard() {
  // All requests fire simultaneously
  const [user, orders, analytics] = await Promise.all([
    getUser(),
    getOrders(),
    getAnalytics()
  ]);

  return <DashboardView user={user} orders={orders} analytics={analytics} />;
}
\`\`\`

### Sequential Fetching (When Necessary)
\`\`\`tsx
async function UserProfile({ userId }: { userId: string }) {
  const user = await getUser(userId);
  
  // Only fetch preferences after we have the user
  const preferences = await getUserPreferences(user.tier);

  return <Profile user={user} preferences={preferences} />;
}
\`\`\`

### Request Deduplication
Next.js automatically deduplicates identical fetch requests in a single render pass:

\`\`\`tsx
// Both components call getUser('123'), but only 1 network request is made
async function Header() {
  const user = await getUser('123');
  return <UserMenu user={user} />;
}

async function Sidebar() {
  const user = await getUser('123');
  return <UserAvatar user={user} />;
}
\`\`\`

## Caching Strategies

RSC works with Next.js caching layers:

\`\`\`tsx
// Static - revalidate every 60 seconds
async function BlogPost({ slug }: { slug: string }) {
  const post = await fetch(\`https://api.example.com/posts/\${slug}\`, {
    next: { revalidate: 60 }
  }).then(r => r.json());

  return <Article post={post} />;
}

// Dynamic - always fresh
async function StockPrice({ symbol }: { symbol: string }) {
  const price = await fetch(\`https://api.stocks.com/\${symbol}\`, {
    cache: 'no-store'
  }).then(r => r.json());

  return <PriceDisplay price={price} />;
}

// On-demand revalidation via Server Actions
async function AdminPanel() {
  async function revalidatePosts() {
    'use server';
    revalidatePath('/blog');
  }

  return <button formAction={revalidatePosts}>Clear Cache</button>;
}
\`\`\`

## Error Handling and Loading States

RSC integrates with React's error boundaries and Suspense:

\`\`\`tsx
// app/dashboard/error.tsx
'use client';

export default function DashboardError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="error-container">
      <h2>Something went wrong in the dashboard</h2>
      <p>{error.message}</p>
      <button onClick={reset}>Try again</button>
    </div>
  );
}

// app/dashboard/loading.tsx
export default function DashboardLoading() {
  return <DashboardSkeleton />;
}
\`\`\`

## Performance Characteristics

Real-world metrics from production apps:

| Metric | Before RSC | After RSC | Improvement |
|--------|-----------|-----------|-------------|
| JavaScript bundle | 340KB | 180KB | -47% |
| Time to Interactive | 3.2s | 1.8s | -44% |
| First Contentful Paint | 1.8s | 0.7s | -61% |
| Lighthouse Score | 78 | 96 | +23% |

Why?
- No JSON over the wire for initial render
- Components that don't need interactivity ship zero JS
- Direct database access eliminates API routes
- Automatic code splitting per route

## Migration Strategy

Converting a traditional React app to RSC:

### Step 1: Identify Server-Only Code
\`\`\`tsx
// BEFORE: Client-side data fetching
function UserProfile() {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    fetch('/api/user')
      .then(r => r.json())
      .then(setUser);
  }, []);

  if (!user) return <Spinner />;
  return <div>{user.name}</div>;
}

// AFTER: Server Component
async function UserProfile() {
  const user = await getUser(); // Direct DB access
  return <div>{user.name}</div>;
}
\`\`\`

### Step 2: Extract Interactive Parts
\`\`\`tsx
// Server Component - non-interactive shell
async function ProductPage({ id }: { id: string }) {
  const product = await getProduct(id);
  
  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <AddToCartButton productId={id} stock={product.stock} />
    </div>
  );
}

// Client Component - interactive piece
'use client';
function AddToCartButton({ productId, stock }: Props) {
  const [loading, setLoading] = useState(false);
  // Interactive logic here
}
\`\`\`

### Step 3: Optimize Data Flow
\`\`\`tsx
// AVOID: Passing large server data through client components
<ClientWrapper>
  <ServerChild data={hugeDataset} /> {/* ✗ Serialization overhead */}
</ClientWrapper>

// PREFER: Composition with children prop
<ClientWrapper>
  <ServerChild /> {/* ✓ No serialization needed */}
</ClientWrapper>
\`\`\`

## Advanced Patterns

### Preloading with Server Components
\`\`\`tsx
import { preload } from 'react-dom';

export default function ProductPage({ id }: { id: string }) {
  // Start loading immediately, before component renders
  preload(\`/api/products/\${id}\`, { as: 'fetch' });
  
  return (
    <Suspense fallback={<Skeleton />}>
      <Product id={id} />
    </Suspense>
  );
}
\`\`\`

### Partial Prerendering (Experimental)
\`\`\`tsx
export const experimental_ppr = true;

// Static shell with dynamic holes
export default async function Page() {
  return (
    <div>
      <StaticHeader />
      <Suspense fallback={<Skeleton />}>
        <DynamicContent /> {/* Streamed on request */}
      </Suspense>
      <StaticFooter />
    </div>
  );
}
\`\`\`

## Common Pitfalls

### 1. Overusing Client Components
\`\`\`tsx
// ✗ BAD: Entire component tree becomes client-side
'use client';
export default function Layout({ children }) {
  return <div>{children}</div>;
}

// ✓ GOOD: Keep client boundary minimal
export default function Layout({ children }) {
  return (
    <div>
      <ClientHeader />
      {children}
    </div>
  );
}
\`\`\`

### 2. Props Serialization
\`\`\`tsx
// ✗ Functions can't be serialized
<ClientComponent onClick={() => console.log('test')} />

// ✓ Use Server Actions
<ClientComponent action={serverAction} />
\`\`\`

### 3. Context Limitations
\`\`\`tsx
// ✗ Can't use Context in Server Components
const theme = useContext(ThemeContext);

// ✓ Pass context values as props from client component
<ClientThemeProvider>
  <ServerComponent />
</ClientThemeProvider>
\`\`\`

## Testing Strategies

\`\`\`tsx
// Testing Server Components
import { render } from '@testing-library/react';

// Mock async data
jest.mock('@/lib/db', () => ({
  user: {
    findUnique: jest.fn().mockResolvedValue({ id: 1, name: 'Test' })
  }
}));

test('renders user profile', async () => {
  const Profile = await import('./ProfileServerComponent');
  const { getByText } = render(<Profile.default userId="1" />);
  
  await waitFor(() => {
    expect(getByText('Test')).toBeInTheDocument();
  });
});

// Testing Client Components (same as before)
import { render, fireEvent } from '@testing-library/react';
import AddToCartButton from './AddToCartButton';

test('handles click', () => {
  const { getByText } = render(<AddToCartButton productId="1" />);
  fireEvent.click(getByText('Add to Cart'));
  expect(mockAction).toHaveBeenCalled();
});
\`\`\`

## When Not to Use RSC

Server Components aren't always the answer:
- Highly interactive apps (Figma, Google Docs) → stick with client-heavy SPA
- Real-time collaboration → use WebSockets + client state
- Offline-first apps → service workers + local-first architecture

## The Future: React 19 and Beyond

Upcoming features that enhance RSC:
- **useFormStatus**: Built-in loading states for forms
- **useOptimistic**: Optimistic updates without custom logic
- **useTransition**: Non-blocking state updates
- **Server Components for React Native**: Coming 2025

## Conclusion

React Server Components represent the biggest architectural shift since Hooks. They enable:
- **Performance**: Less JS, faster loads
- **Developer Experience**: No API boilerplate
- **Security**: Sensitive code stays on the server
- **Composability**: Mix server and client seamlessly

The learning curve is real, but the payoff is massive. Start with one page, gradually convert your app, and watch your metrics improve.

What's blocking your RSC adoption? Let's solve it in the comments.`,
    excerpt: "Complete guide to React Server Components in 2025: architecture patterns, data fetching strategies, migration paths, and real-world performance wins that make RSC essential.",
    author: "Goutam Singha",
    publishedAt: new Date("2025-09-01"),
    status: "published",
    tags: ["react-tag", "nextjs-tag", "performance-tag"],
    categories: ["React", "Next.js", "Web Performance"],
    viewCount: 24800,
    createdAt: new Date("2025-08-25"),
    updatedAt: new Date("2025-09-01")
  },

  {
    title: "Node.js at Scale: Building High-Throughput APIs That Don't Break",
    slug: "nodejs-high-throughput-apis-2025",
    content: `# Node.js at Scale: Building High-Throughput APIs That Don't Break

Node.js handles billions of requests daily across Netflix, Uber, and PayPal. But most developers never push it past local development. Here's how to build Node APIs that handle 100K+ req/sec without choking.

## The Event Loop Isn't Magic—It's a Contract

Node's single-threaded nature is both its superpower and kryptonite. Respect the event loop or pay the price.

### What Blocks the Loop

\`\`\`javascript
// ✗ DEATH: Synchronous file read blocks everything
const fs = require('fs');
app.get('/data', (req, res) => {
  const data = fs.readFileSync('/large-file.json'); // BLOCKS
  res.json(JSON.parse(data));
});

// ✓ LIFE: Async operations keep the loop spinning
app.get('/data', async (req, res) => {
  const data = await fs.promises.readFile('/large-file.json', 'utf8');
  res.json(JSON.parse(data));
});

// ✓ BETTER: Stream large files
app.get('/data', (req, res) => {
  const stream = fs.createReadStream('/large-file.json');
  stream.pipe(res);
});
\`\`\`

### CPU-Intensive Tasks

For heavy computation, offload to worker threads:

\`\`\`javascript
const { Worker } = require('worker_threads');

function processDataInWorker(data) {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./worker.js', {
      workerData: data
    });

    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', (code) => {
      if (code !== 0) reject(new Error(\`Worker stopped with exit code \${code}\`));
    });
  });
}

// worker.js
const { parentPort, workerData } = require('worker_threads');

// Expensive computation here
const result = complexCalculation(workerData);
parentPort.postMessage(result);
\`\`\`

## Database Connection Pooling: The Silent Killer

Most Node apps die from connection exhaustion, not traffic.

### Connection Pool Configuration

\`\`\`javascript
const { Pool } = require('pg');

// ✗ TOO SMALL: Requests queue up, timeouts everywhere
const badPool = new Pool({
  max: 5, // Only 5 connections for entire app
  idleTimeoutMillis: 30000
});

// ✓ OPTIMAL: Math-based sizing
const optimalPool = new Pool({
  // Max connections = (Number of CPU cores × 2) + effective_spindle_count
  // For most cloud instances: 4 cores × 2 + 1 = 9
  max: 10,
  
  // Don't hoard idle connections
  idleTimeoutMillis: 10000,
  
  // Fail fast instead of queuing forever
  connectionTimeoutMillis: 5000,
  
  // Keep connections alive through load balancers
  keepAlive: true,
  keepAliveInitialDelayMillis: 10000
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  await optimalPool.end();
  process.exit(0);
});
\`\`\`

### Query Optimization

\`\`\`javascript
// ✗ N+1 Query Problem
async function getUsersWithPosts() {
  const users = await db.query('SELECT * FROM users');
  
  for (const user of users) {
    user.posts = await db.query('SELECT * FROM posts WHERE user_id = $1', [user.id]);
  }
  
  return users;
}

// ✓ Single Query with JOIN
async function getUsersWithPosts() {
  const result = await db.query(\`
    SELECT 
      users.*,
      json_agg(posts.*) as posts
    FROM users
    LEFT JOIN posts ON posts.user_id = users.id
    GROUP BY users.id
  \`);
  
  return result.rows;
}

// ✓ EVEN BETTER: Use prepared statements
const getUsersStmt = 'SELECT * FROM users WHERE created_at > $1 LIMIT $2';

async function getRecentUsers(since, limit) {
  // PostgreSQL caches execution plan
  return db.query({ name: 'get-recent-users', text: getUsersStmt }, [since, limit]);
}
\`\`\`

## Caching Layers: The Force Multiplier

Strategic caching can reduce database load by 95%+.

### In-Memory Cache with node-cache

\`\`\`javascript
const NodeCache = require('node-cache');

// TTL-based cache
const cache = new NodeCache({ 
  stdTTL: 600, // 10 minutes
  checkperiod: 120, // Check for expired keys every 2 minutes
  useClones: false // Don't clone objects (faster, but mutability risk)
});

async function getUser(userId) {
  const cacheKey = \`user:\${userId}\`;
  
  // Check cache first
  let user = cache.get(cacheKey);
  if (user) return user;
  
  // Cache miss - fetch from DB
  user = await db.query('SELECT * FROM users WHERE id = $1', [userId]);
  
  // Store in cache
  cache.set(cacheKey, user);
  
  return user;
}

// Invalidate cache on updates
async function updateUser(userId, data) {
  await db.query('UPDATE users SET data = $1 WHERE id = $2', [data, userId]);
  
  // Remove stale cache
  cache.del(\`user:\${userId}\`);
}
\`\`\`

### Redis for Distributed Caching

\`\`\`javascript
const Redis = require('ioredis');

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: 6379,
  maxRetriesPerRequest: 3,
  enableReadyCheck: true,
  lazyConnect: true
});

// Cache-aside pattern
async function getCachedData(key, fetchFunction, ttl = 3600) {
  try {
    // Try cache first
    const cached = await redis.get(key);
    if (cached) return JSON.parse(cached);
    
    // Cache miss - fetch from source
    const data = await fetchFunction();
    
    // Store in cache with TTL
    await redis.setex(key, ttl, JSON.stringify(data));
    
    return data;
  } catch (error) {
    console.error('Redis error:', error);
    // Fallback to direct fetch if Redis is down
    return fetchFunction();
  }
}

// Usage
app.get('/products/:id', async (req, res) => {
  const product = await getCachedData(
    \`product:\${req.params.id}\`,
    () => db.getProduct(req.params.id),
    1800 // 30 minute TTL
  );
  
  res.json(product);
});

// Cache warming on startup
async function warmCache() {
  const hotProducts = await db.query('SELECT id FROM products WHERE views > 1000');
  
  await Promise.all(
    hotProducts.map(p => getCachedData(\`product:\${p.id}\`, () => db.getProduct(p.id)))
  );
}
\`\`\`

## Request Validation: Fail Fast

Never trust client input. Validate at the edge.

\`\`\`javascript
const Joi = require('joi');

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  age: Joi.number().integer().min(18).max(120),
  role: Joi.string().valid('user', 'admin', 'moderator').default('user')
});

function validateRequest(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false, // Return all errors, not just first
      stripUnknown: true // Remove unknown fields
    });

    if (error) {
      return res.status(400).json({
        error: 'Validation failed',
        details: error.details.map(d => d.message)
      });
    }

    req.body = value; // Use validated data
    next();
  };
}

app.post('/users', validateRequest(userSchema), async (req, res) => {
  const user = await createUser(req.body);
  res.status(201).json(user);
});
\`\`\`

## Rate Limiting: Protect Your Resources

Prevent abuse without impacting legitimate users.

\`\`\`javascript
const rateLimit = require('express-rate-limit');
const RedisStore = require('rate-limit-redis');

// Distributed rate limiting across multiple servers
const limiter = rateLimit({
  store: new RedisStore({
    client: redis,
    prefix: 'rl:'
  }),
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per window
  message: 'Too many requests, please try again later',
  standardHeaders: true, // Return rate limit info in headers
  legacyHeaders: false
});

// Apply to all routes
app.use(limiter);

// Stricter limits for expensive endpoints
const strictLimiter = rateLimit({
  store: new RedisStore({ client: redis }),
  windowMs: 60 * 1000, // 1 minute
  max: 5 // Only 5 requests per minute
});

app.post('/api/heavy-operation', strictLimiter, async (req, res) => {
  // Expensive operation here
});
\`\`\`

## Error Handling: Don't Crash in Production

\`\`\`javascript
// Global error handler
app.use((err, req, res, next) => {
  // Log full error details
  console.error('Error:', {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    body: req.body,
    userId: req.user?.id
  });

  // Don't expose internal errors to clients
  if (err.isOperational) {
    return res.status(err.statusCode || 500).json({
      error: err.message
    });
  }

  // Unexpected errors
  res.status(500).json({
    error: 'Internal server error'
  });
});

// Custom error class
class AppError extends Error {
  constructor(message, statusCode, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Usage
async function getUser(id) {
  const user = await db.query('SELECT * FROM users WHERE id = $1', [id]);
  
  if (!user) {
    throw new AppError('User not found', 404);
  }
  
  return user;
}

// Async error wrapper
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

app.get('/users/:id', asyncHandler(async (req, res) => {
  const user = await getUser(req.params.id);
  res.json(user);
}));

// Uncaught exception handler
process.on('uncaughtException', (error) => {
  console.error('UNCAUGHT EXCEPTION:', error);
  // Gracefully shutdown
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('UNHANDLED REJECTION:', reason);
  process.exit(1);
});
\`\`\`

## Monitoring and Observability

\`\`\`javascript
const promClient = require('prom-client');

// Collect default metrics
const register = new promClient.Registry();
promClient.collectDefaultMetrics({ register });

// Custom metrics
const httpRequestDuration = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 0.5, 1, 2, 5]
});

const activeConnections = new promClient.Gauge({
  name: 'active_connections',
  help: 'Number of active connections'
});

register.registerMetric(httpRequestDuration);
register.registerMetric(activeConnections);

// Middleware to track metrics
app.use((req, res, next) => {
  const start = Date.now();
  
  activeConnections.inc();
  
  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    
    httpRequestDuration
      .labels(req.method, req.route?.path || req.path, res.statusCode)
      .observe(duration);
    
    activeConnections.dec();
  });
  
  next();
});

// Expose metrics endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});
\`\`\`

## Load Testing: Find Your Breaking Point

\`\`\`javascript
// artillery.yml
const config = {
  target: 'http://localhost:3000',
  phases: [
    { duration: 60, arrivalRate: 10, name: 'Warm up' },
    { duration: 120, arrivalRate: 50, name: 'Ramp up' },
    { duration: 300, arrivalRate: 100, name: 'Sustained load' },
    { duration: 60, arrivalRate: 200, name: 'Spike test' }
  ],
  scenarios: [
    {
      name: 'User flow',
      flow: [
        { get: { url: '/health' } },
        { think: 2 },
        { post: { url: '/api/users', json: { name: 'Test User' } } },
        { think: 1 },
        { get: { url: '/api/users/{{ userId }}' } }
      ]
    }
  ]
};

// Run: artillery run artillery.yml
\`\`\`

## Clustering: Utilize All CPU Cores

\`\`\`javascript
const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
  const numWorkers = os.cpus().length;
  
  console.log(\`Master process \${process.pid} starting \${numWorkers} workers\`);
  
  for (let i = 0; i < numWorkers; i++) {
    cluster.fork();
  }
  
  cluster.on('exit', (worker, code, signal) => {
    console.log(\`Worker \${worker.process.pid} died. Starting new worker...\`);
    cluster.fork();
  });
  
} else {
  // Worker processes run the app
  const app = require('./app');
  
  app.listen(3000, () => {
    console.log(\`Worker \${process.pid} listening on port 3000\`);
  });
}
\`\`\`

## Production Checklist

- [ ] Helmet.js for security headers
- [ ] Compression middleware
- [ ] Request logging (morgan, winston)
- [ ] Health check endpoints
- [ ] Graceful shutdown handling
- [ ] Environment-based config
- [ ] Database connection pooling
- [ ] Redis caching layer
- [ ] Rate limiting
- [ ] Input validation
- [ ] Error monitoring (Sentry)
- [ ] Metrics (Prometheus)
- [ ] Load testing results
- [ ] Horizontal scaling tested
- [ ] Zero-downtime deployment

## Conclusion

Node.js can handle massive scale, but it requires discipline. Follow these patterns and you'll build APIs that scale horizontally, fail gracefully, and stay fast under load.

Most performance problems aren't Node's fault—they're architectural choices. Fix the architecture, and Node will reward you.

What's your biggest Node.js bottleneck? Drop it below.`,
    excerpt: "Build production-ready Node.js APIs that handle 100K+ req/sec: event loop mastery, connection pooling, caching strategies, monitoring, and battle-tested scaling patterns.",
    author: "Goutam Singha",
    publishedAt: new Date("2025-07-28"),
    status: "published",
    tags: ["nodejs-tag", "backend-tag", "performance-tag"],
    categories: ["Node.js", "API Development", "Web Performance"],
    viewCount: 19300,
    createdAt: new Date("2025-07-22"),
    updatedAt: new Date("2025-07-28")
  },

  {
    title: "MongoDB Schema Design for Scale: Patterns That Work in Production",
    slug: "mongodb-schema-design-patterns-2025",
    content: `# MongoDB Schema Design for Scale: Patterns That Work in Production

MongoDB's flexibility is its biggest strength and weakness. Design your schema right, and queries are blazing fast. Design it wrong, and you'll spend months refactoring while your app crawls.

Here's what actually works at scale.

## Embedding vs Referencing: The Decision Matrix

The biggest MongoDB question you'll face. Get it wrong and performance tanks.

### When to Embed

Embed when:
- One-to-few relationship (< 100 items)
- Data is frequently accessed together
- Data doesn't change independently

\`\`\`javascript
// ✓ GOOD: User with addresses (1-to-few)
{
  _id: ObjectId("..."),
  name: "Gideon",
  email: "gideon@example.com",
  addresses: [
    {
      type: "home",
      street: "123 Main St",
      city: "San Francisco",
      zip: "94102"
    },
    {
      type: "work",
      street: "456 Tech Ave",
      city: "Palo Alto",
      zip: "94301"
    }
  ]
}

// ✓ GOOD: Blog post with comments (limited)
{
  _id: ObjectId("..."),
  title: "MongoDB Best Practices",
  content: "...",
  comments: [
    {
      author: "User1",
      text: "Great post!",
      createdAt: ISODate("2025-01-15")
    }
    // Limit to recent 50 comments
  ],
  commentCount: 247 // Track total separately
}
\`\`\`

### When to Reference

Reference when:
- One-to-many (> 100 items)
- One-to-squillions (unbounded growth)
- Data is accessed independently
- Data changes frequently

\`\`\`javascript
// ✓ GOOD: User and Orders (1-to-many)
// users collection
{
  _id: ObjectId("user123"),
  name: "Gideon",
  email: "gideon@example.com"
}

// orders collection
{
  _id: ObjectId("order456"),
  userId: ObjectId("user123"), // Reference
  items: [...],
  total: 99.99,
  createdAt: ISODate("2025-01-15")
}

// ✗ BAD: Embedding unbounded array
{
  _id: ObjectId("user123"),
  orders: [
    { /* order 1 */ },
    { /* order 2 */ },
    // ... could have thousands, hitting 16MB limit
  ]
}
\`\`\`

## The Hybrid Pattern: Best of Both Worlds

For many-to-many relationships, use a hybrid approach:

\`\`\`javascript
// Products collection
{
  _id: ObjectId("prod123"),
  name: "Laptop",
  price: 999.99,
  // Embed most frequently accessed category info
  primaryCategory: {
    _id: ObjectId("cat456"),
    name: "Electronics",
    slug: "electronics"
  },
  // Reference for full category data
  allCategoryIds: [
    ObjectId("cat456"),
    ObjectId("cat789")
  ]
}

// Categories collection
{
  _id: ObjectId("cat456"),
  name: "Electronics",
  slug: "electronics",
  description: "...",
  parentId: null
}
\`\`\`

## The Extended Reference Pattern

For relationships where you need quick access to key fields:

\`\`\`javascript
// Order with extended user reference
{
  _id: ObjectId("order123"),
  // Embed frequently needed user data
  user: {
    _id: ObjectId("user456"),
    name: "Gideon",
    email: "gideon@example.com"
    // Don't embed everything - just what's needed for order display
  },
  items: [...],
  total: 149.99,
  status: "shipped"
}

// Full user data still in users collection
{
  _id: ObjectId("user456"),
  name: "Gideon",
  email: "gideon@example.com",
  password: "...",
  addresses: [...],
  paymentMethods: [...],
  // Lots more data not needed in orders
}
\`\`\`

## The Bucket Pattern: Time-Series Data

Perfect for metrics, logs, IoT data:

\`\`\`javascript
// ✗ BAD: One document per reading
{
  _id: ObjectId("..."),
  sensorId: "sensor001",
  temperature: 72.5,
  timestamp: ISODate("2025-01-15T10:00:00Z")
}
// Result: Millions of tiny documents, poor performance

// ✓ GOOD: Bucket pattern
{
  _id: ObjectId("..."),
  sensorId: "sensor001",
  date: ISODate("2025-01-15"), // Bucket by day
  readings: [
    { temp: 72.5, time: ISODate("2025-01-15T10:00:00Z") },
    { temp: 73.1, time: ISODate("2025-01-15T10:01:00Z") },
    { temp: 72.8, time: ISODate("2025-01-15T10:02:00Z") },
    // ... up to 1440 readings per day (1 per minute)
  ],
  readingCount: 1440,
  avgTemp: 72.7,
  minTemp: 68.2,
  maxTemp: 76.4
}
\`\`\`

## The Subset Pattern: Large Documents

When documents grow too large, split hot and cold data:

\`\`\`javascript
// ✗ BAD: Everything in one document
{
  _id: ObjectId("movie123"),
  title: "Inception",
  // Hot data (frequently accessed)
  rating: 8.8,
  genre: ["Sci-Fi", "Thriller"],
  // Cold data (rarely accessed)
  reviews: [
    { author: "User1", text: "Amazing movie! The plot twist at the end was mind-blowing. Christopher Nolan is a genius...", rating: 5 },
    // ... 10,000+ reviews
  ]
}

// ✓ GOOD: Split into multiple collections
// movies collection (hot data)
{
  _id: ObjectId("movie123"),
  title: "Inception",
  rating: 8.8,
  genre: ["Sci-Fi", "Thriller"],
  reviewCount: 10547,
  topReviews: [
    // Only top 10 reviews embedded
    { author: "User1", text: "Amazing!", rating: 5 }
  ]
}

// reviews collection (cold data)
{
  _id: ObjectId("review789"),
  movieId: ObjectId("movie123"),
  author: "User1",
  text: "Amazing movie! The plot twist at the end was mind-blowing...",
  rating: 5,
  helpfulCount: 234,
  createdAt: ISODate("2025-01-15")
}
\`\`\`

## Indexing Strategies

Indexes make or break MongoDB performance.

### Compound Indexes

Order matters tremendously:

\`\`\`javascript
// Query: Find active users in a specific city, sorted by signup date
db.users.find({ status: "active", city: "San Francisco" }).sort({ signupDate: -1 })

// ✗ BAD: Wrong index order
db.users.createIndex({ signupDate: -1, city: 1, status: 1 })

// ✓ GOOD: ESR (Equality, Sort, Range) rule
db.users.createIndex({ 
  status: 1,      // Equality first
  signupDate: -1, // Sort second
  city: 1         // Range last
})

// Even better: If city has high cardinality
db.users.createIndex({ city: 1, status: 1, signupDate: -1 })
\`\`\`

### Partial Indexes

Save space and improve performance:

\`\`\`javascript
// Only index active users
db.users.createIndex(
  { email: 1 },
  { 
    partialFilterExpression: { status: "active" },
    unique: true
  }
)

// Only index documents with specific fields
db.orders.createIndex(
  { refundedAt: 1 },
  { 
    partialFilterExpression: { refundedAt: { $exists: true } }
  }
)
\`\`\`

### Text Indexes for Search

\`\`\`javascript
db.articles.createIndex({
  title: "text",
  content: "text",
  tags: "text"
}, {
  weights: {
    title: 10,    // Title matches rank higher
    tags: 5,
    content: 1
  },
  name: "article_search"
})

// Usage
db.articles.find({ $text: { $search: "mongodb schema design" } })
  .sort({ score: { $meta: "textScore" } })
\`\`\`

## Schema Validation

Enforce data quality at the database level:

\`\`\`javascript
db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["email", "name", "createdAt"],
      properties: {
        email: {
          bsonType: "string",
          pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
          description: "must be a valid email"
        },
        name: {
          bsonType: "string",
          minLength: 2,
          maxLength: 100
        },
        age: {
          bsonType: "int",
          minimum: 18,
          maximum: 120
        },
        role: {
          enum: ["user", "admin", "moderator"],
          description: "must be one of the allowed roles"
        },
        createdAt: {
          bsonType: "date"
        }
      }
    }
  },
  validationAction: "error" // or "warn"
})

// Update validation rules
db.runCommand({
  collMod: "users",
  validator: { /* new schema */ },
  validationLevel: "moderate" // Applies to new docs and updates
})
\`\`\`

## Aggregation Pipeline Optimization

\`\`\`javascript
// ✗ BAD: Fetch everything, filter in app
const users = await db.users.find().toArray();
const active = users.filter(u => u.status === 'active');
const summary = active.reduce((acc, u) => { /* ... */ }, {});

// ✓ GOOD: Let MongoDB do the work
const summary = await db.users.aggregate([
  // Filter early to reduce documents in pipeline
  { $match: { status: "active" } },
  
  // Project only needed fields
  { $project: { name: 1, purchaseAmount: 1, city: 1 } },
  
  // Group and calculate
  { $group: {
    _id: "$city",
    totalUsers: { $sum: 1 },
    totalRevenue: { $sum: "$purchaseAmount" },
    avgRevenue: { $avg: "$purchaseAmount" }
  }},
  
  // Sort results
  { $sort: { totalRevenue: -1 } },
  
  // Limit results
  { $limit: 10 }
]).toArray();

// Use indexes for $match and $sort
db.users.createIndex({ status: 1, city: 1, purchaseAmount: 1 })
\`\`\`

## Transactions: When and How

Use transactions sparingly—they're expensive:

\`\`\`javascript
const session = client.startSession();

try {
  await session.withTransaction(async () => {
    // Transfer money between accounts
    await db.accounts.updateOne(
      { _id: fromAccountId },
      { $inc: { balance: -amount } },
      { session }
    );

    await db.accounts.updateOne(
      { _id: toAccountId },
      { $inc: { balance: amount } },
      { session }
    );

    await db.transactions.insertOne({
      from: fromAccountId,
      to: toAccountId,
      amount,
      timestamp: new Date()
    }, { session });
  });
} finally {
  await session.endSession();
}

// ✓ BETTER: Avoid transactions with smart schema design
// Instead of two separate account docs, use a single ledger
{
  _id: ObjectId("..."),
  accountId: "account123",
  transactions: [
    { type: "debit", amount: -50, timestamp: ISODate("...") },
    { type: "credit", amount: 100, timestamp: ISODate("...") }
  ],
  balance: 50 // Computed field, updated atomically
}
\`\`\`

## Change Streams: Real-Time Updates

\`\`\`javascript
const changeStream = db.orders.watch([
  { $match: { 
    operationType: { $in: ["insert", "update"] },
    "fullDocument.status": "pending"
  }}
]);

changeStream.on("change", (change) => {
  console.log("New pending order:", change.fullDocument);
  
  // Trigger notification, update cache, etc.
  notifyWarehouse(change.fullDocument);
});

// Resume from a specific point in time (disaster recovery)
const resumeToken = await getLastProcessedToken();
const changeStream = db.orders.watch([], { resumeAfter: resumeToken });
\`\`\`

## Performance Monitoring

\`\`\`javascript
// Enable profiling
db.setProfilingLevel(1, { slowms: 100 }); // Log queries > 100ms

// Analyze slow queries
db.system.profile.find({
  millis: { $gt: 100 }
}).sort({ ts: -1 }).limit(10)

// Explain query performance
db.users.find({ city: "San Francisco", status: "active" })
  .sort({ signupDate: -1 })
  .explain("executionStats")

// Check index usage
db.users.aggregate([
  { $indexStats: {} }
])

// Database stats
db.stats()
db.users.stats()
\`\`\`

## Migration Strategies

\`\`\`javascript
// Gradual schema migration without downtime

// Step 1: Add new field alongside old one
db.users.updateMany({}, [
  { $set: { 
    fullName: { $concat: ["$firstName", " ", "$lastName"] }
  }}
])

// Step 2: Update application to use new field, but support both
function getUserName(user) {
  return user.fullName || \`\${user.firstName} \${user.lastName}\`;
}

// Step 3: Once all apps updated, remove old fields
db.users.updateMany({}, {
  $unset: { firstName: "", lastName: "" }
})

// For large collections, use batching
async function migrateLargeCollection() {
  let lastId = null;
  const batchSize = 1000;

  while (true) {
    const query = lastId ? { _id: { $gt: lastId } } : {};
    
    const batch = await db.users.find(query)
      .limit(batchSize)
      .sort({ _id: 1 })
      .toArray();

    if (batch.length === 0) break;

    const bulkOps = batch.map(doc => ({
      updateOne: {
        filter: { _id: doc._id },
        update: { $set: { /* migration logic */ } }
      }
    }));

    await db.users.bulkWrite(bulkOps);
    
    lastId = batch[batch.length - 1]._id;
    
    // Throttle to avoid overwhelming DB
    await new Promise(resolve => setTimeout(resolve, 100));
  }
}
\`\`\`

## Sharding Considerations

\`\`\`javascript
// Choose shard key carefully - can't change it later!

// ✗ BAD: Monotonically increasing key (ObjectId, timestamp)
// Results in all writes going to single shard
sh.shardCollection("mydb.orders", { _id: 1 })

// ✓ GOOD: High cardinality, even distribution
sh.shardCollection("mydb.orders", { userId: 1, createdAt: 1 })

// ✓ BETTER: Hashed shard key for even distribution
sh.shardCollection("mydb.orders", { userId: "hashed" })

// Tag-aware sharding (geo-distribution)
sh.addShardTag("shard0001", "US-EAST")
sh.addShardTag("shard0002", "US-WEST")
sh.addTagRange("mydb.users", { region: "US-EAST" }, { region: "US-WEST" }, "US-EAST")
\`\`\`

## Production Checklist

- [ ] Schema design follows access patterns
- [ ] Indexes cover all common queries
- [ ] Partial indexes for sparse data
- [ ] Schema validation enabled
- [ ] Connection pooling configured
- [ ] Replica set with 3+ nodes
- [ ] Read preferences set correctly
- [ ] Write concerns appropriate for use case
- [ ] Backup strategy tested
- [ ] Monitoring and alerting configured
- [ ] Slow query logging enabled
- [ ] Index usage analyzed
- [ ] TTL indexes for expiring data
- [ ] Change streams for real-time features
- [ ] Sharding strategy if > 1TB data

## Conclusion

MongoDB schema design is about understanding your access patterns and optimizing for them. There's no one-size-fits-all—every application is different.

The patterns here are battle-tested at scale. Use them as starting points, then adapt to your specific needs.

What's your toughest MongoDB schema challenge? Let's solve it.`,
    excerpt: "Production-proven MongoDB schema patterns for 2025: embedding vs referencing, bucketing, indexing strategies, aggregation optimization, and real-world scaling techniques.",
    author: "Goutam Singha",
    publishedAt: new Date("2025-08-05"),
    status: "published",
    tags: ["mongodb-tag", "database-tag", "backend-tag"],
    categories: ["MongoDB", "API Development"],
    viewCount: 16700,
    createdAt: new Date("2025-07-30"),
    updatedAt: new Date("2025-08-05")
  },
  {
    title: "TypeScript Mastery in 2025: Advanced Patterns for Robust Applications",
    slug: "typescript-mastery-2025",
    content: `# TypeScript Mastery in 2025: Advanced Patterns for Robust Applications

In 2025, TypeScript has evolved into the de facto standard for large-scale JavaScript development, with enhanced type inference and AI-assisted tooling. Whether you're building enterprise apps or microservices, mastering advanced patterns ensures code that's maintainable, scalable, and error-free.

## Advanced Type Utilities
Leverage utility types like Partial, Required, and custom mapped types for flexible interfaces. Use conditional types for dynamic behaviors based on input.

\`\`\`ts
// Advanced conditional type example
type ExtractPromise<T> = T extends Promise<infer U> ? U : T;

async function fetchData(): Promise<{ id: number; name: string }> {
  return { id: 1, name: 'Example' };
}

type DataType = ExtractPromise<ReturnType<typeof fetchData>>; // { id: number; name: string }
\`\`\`

## Generics and Constraints
Generics allow reusable components. Add constraints to ensure type safety without overcomplicating.

\`\`\`ts
function mergeObjects<T extends object, U extends object>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 };
}

const merged = mergeObjects({ a: 1 }, { b: 'test' }); // { a: number; b: string }
\`\`\`

## Integration with Modern Tools
Pair TypeScript with ESLint plugins for strict checks and Vite for faster builds. Use TypeScript 5.3+ features like const type parameters for immutable patterns.

## Common Pitfalls and Solutions
Avoid any overuse—opt for unknown over any. Handle async types with Awaited. For large projects, modularize types in separate declaration files.

## Future-Proofing Your Codebase
Adopt JSDoc for hybrid JS/TS environments and explore AI code completion tools that respect TypeScript annotations.

Mastering these will elevate your code quality. What's your go-to TypeScript pattern? Discuss below!

(Full article includes deep dives into decorators, namespaces, and real-world refactoring case studies...)`,
    excerpt: "Dive into 2025 TypeScript advanced patterns: utilities, generics, tool integrations, pitfalls, and strategies for building robust, scalable applications.",
    author: "Alex Rivera",
    publishedAt: new Date("2025-08-05"),
    status: "published",
    tags: ["typescript-tag"],
    categories: ["TypeScript"],
    viewCount: 18500,
    createdAt: new Date("2025-07-30"),
    updatedAt: new Date("2025-08-05")
  },
  {
    title: "Node.js Scaling Strategies 2025: From Monoliths to Microservices",
    slug: "nodejs-scaling-2025",
    content: `# Node.js Scaling Strategies 2025: From Monoliths to Microservices

Node.js in 2025 is more performant than ever with native ESM support and improved worker threads. Scaling applications requires strategic shifts from monolithic architectures to distributed systems for handling massive traffic.

## Clustering and Worker Threads
Use the cluster module for multi-core utilization. For I/O-bound tasks, worker threads offload computations without blocking the event loop.

\`\`\`js
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
  // Worker code here
  const http = require('http');
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end('Hello World');
  }).listen(8000);
}
\`\`\`

## Microservices with gRPC and Kafka
Transition to microservices using gRPC for efficient RPCs and Kafka for event-driven communication. Implement service discovery with Consul.

## Performance Monitoring
Integrate Prometheus and Grafana for metrics. Use Node.js diagnostics like heap snapshots for memory leaks.

## Security in Scaled Environments
Enforce HTTPS, rate limiting with express-rate-limit, and secrets management via Vault.

## Deployment Best Practices
Containerize with Docker and orchestrate with Kubernetes. Leverage serverless options like AWS Lambda for auto-scaling.

These strategies will handle growth seamlessly. Share your scaling horror stories!

(Full article covers load balancing, database sharding, and case studies from high-traffic apps...)`,
    excerpt: "2025 Node.js scaling guide: clustering, microservices, monitoring, security, and deployment tactics to evolve from monoliths to resilient systems.",
    author: "Jordan Lee",
    publishedAt: new Date("2025-09-10"),
    status: "published",
    tags: ["nodejs-tag"],
    categories: ["Node.js"],
    viewCount: 19800,
    createdAt: new Date("2025-09-01"),
    updatedAt: new Date("2025-09-10")
  },
  {
    title: "MongoDB Optimization Techniques for 2025: High-Throughput Databases",
    slug: "mongodb-optimization-2025",
    content: `# MongoDB Optimization Techniques for 2025: High-Throughput Databases

MongoDB 8.0 in 2025 brings vector search and enhanced sharding. Optimizing for high throughput involves indexing, schema design, and query tuning to handle petabyte-scale data.

## Indexing Strategies
Compound indexes for multi-field queries. Use TTL indexes for auto-expiration and partial indexes for sparse data.

\`\`\`js
// Creating a compound index
db.collection.createIndex({ category: 1, price: -1 }, { background: true });
\`\`\`

## Schema Design Best Practices
Embed documents for read-heavy ops, reference for relational data. Denormalize wisely to reduce joins.

## Query Performance
Leverage aggregation pipelines with $lookup for joins. Use explain() to analyze query plans.

\`\`\`js
db.orders.aggregate([
  { $match: { status: 'A' } },
  { $group: { _id: '$cust_id', total: { $sum: '$amount' } } }
]);
\`\`\`

## Sharding and Replication
Distribute data across shards with hashed keys. Set up replica sets for high availability.

## Monitoring and Tools
Use MongoDB Atlas for managed ops, Ops Manager for on-prem. Integrate with ELK stack for logs.

Optimize now to future-proof your data layer. What's your MongoDB bottleneck?

(Full article includes advanced vector search, time-series collections, and migration case studies...)`,
    excerpt: "2025 MongoDB optimization: indexing, schema design, queries, sharding, and tools for building high-throughput, scalable databases.",
    author: "Samantha Chen",
    publishedAt: new Date("2025-10-15"),
    status: "published",
    tags: ["mongodb-tag"],
    categories: ["MongoDB"],
    viewCount: 17400,
    createdAt: new Date("2025-10-10"),
    updatedAt: new Date("2025-10-15")
  },
  {
    title: "AI & Machine Learning Integration in Web Apps 2025",
    slug: "ai-ml-web-apps-2025",
    content: `# AI & Machine Learning Integration in Web Apps 2025

By 2025, AI/ML is embedded in every web app, from recommendation engines to real-time analytics. Frameworks like TensorFlow.js and ONNX make client-side inference feasible.

## Model Training Basics
Use scikit-learn for prototyping, then scale with TensorFlow or PyTorch. Focus on ethical data sourcing.

\`\`\`python
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
clf = RandomForestClassifier()
clf.fit(X_train, y_train)
\`\`\`

## Client-Side ML with TensorFlow.js
Run models in the browser for privacy-preserving predictions.

\`\`\`js
import * as tf from '@tensorflow/tfjs';

const model = await tf.loadLayersModel('model.json');
const prediction = model.predict(tf.tensor2d([input]));
\`\`\`

## Server-Side Deployment
Host models on Node.js with TensorFlow Serving or FastAPI. Use Kubernetes for scaling inference endpoints.

## Ethical Considerations
Mitigate bias with fairness audits. Ensure transparency in AI decisions.

## Future Trends
Edge AI and federated learning will dominate. Integrate now for competitive edges.

What's your first AI feature? Let's discuss!

(Full article explores NLP, computer vision, and production ML pipelines...)`,
    excerpt: "2025 guide to AI/ML in web apps: training, client/server integration, ethics, and trends for intelligent, responsive applications.",
    author: "Raj Patel",
    publishedAt: new Date("2025-11-20"),
    status: "published",
    tags: ["ai-tag", "ml-tag"],
    categories: ["AI & Machine Learning"],
    viewCount: 22000,
    createdAt: new Date("2025-11-15"),
    updatedAt: new Date("2025-11-20")
  },
  {
    title: "Web Performance Optimization 2025: Core Web Vitals Mastery",
    slug: "web-performance-2025",
    content: `# Web Performance Optimization 2025: Core Web Vitals Mastery

In 2025, Core Web Vitals evolve with INP (Interaction to Next Paint) as key. Optimizing for speed impacts SEO and user retention.

## Lazy Loading and Code Splitting
Use dynamic imports for code splitting. Lazy load images and iframes natively.

\`\`\`jsx
const LazyComponent = React.lazy(() => import('./Component'));
<Suspense fallback={<div>Loading...</div>}>
  <LazyComponent />
</Suspense>
\`\`\`

## Compression and Caching
Enable Brotli compression. Use service workers for offline caching.

\`\`\`js
// Service worker example
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
\`\`\`

## Image and Asset Optimization
Adopt AVIF for images, WebAssembly for heavy computations.

## Monitoring Tools
Leverage Lighthouse, WebPageTest, and Real User Monitoring (RUM) via Sentry.

## Mobile-First Strategies
Prioritize AMP or PWA for fast mobile loads.

Achieve sub-second loads. Share your perf wins!

(Full article includes HTTP/3, prefetching, and case studies from e-commerce sites...)`,
    excerpt: "2025 web performance guide: lazy loading, compression, monitoring, and strategies to master Core Web Vitals for blazing-fast sites.",
    author: "Emily Wong",
    publishedAt: new Date("2025-12-01"),
    status: "published",
    tags: ["performance-tag"],
    categories: ["Web Performance"],
    viewCount: 19200,
    createdAt: new Date("2025-11-25"),
    updatedAt: new Date("2025-12-01")
  },
  {
    title: "DevOps Automation in 2025: CI/CD Pipelines Reimagined",
    slug: "devops-automation-2025",
    content: `# DevOps Automation in 2025: CI/CD Pipelines Reimagined

DevOps in 2025 leverages AI-driven pipelines with GitHub Actions and ArgoCD. Automation reduces toil, enabling faster releases.

## CI/CD Setup
Use GitHub Actions for workflows. Integrate testing, linting, and deployment.

\`\`\`yaml
name: CI
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run tests
        run: npm test
\`\`\`

## Infrastructure as Code
Terraform for provisioning, Ansible for configuration management.

## Monitoring and Observability
Prometheus for metrics, ELK for logs, Jaeger for tracing.

## Security in DevOps (DevSecOps)
Scan with Snyk, enforce policies with OPA.

## GitOps Practices
Manage deployments declaratively with Flux or ArgoCD.

Automate to innovate. What's your pipeline stack?

(Full article covers serverless DevOps, AIOps, and enterprise case studies...)`,
    excerpt: "2025 DevOps automation: CI/CD, IaC, monitoring, security, and GitOps for efficient, reliable software delivery.",
    author: "Michael Torres",
    publishedAt: new Date("2025-06-10"),
    status: "published",
    tags: ["devops-tag"],
    categories: ["DevOps"],
    viewCount: 20500,
    createdAt: new Date("2025-06-05"),
    updatedAt: new Date("2025-06-10")
  },
  {
    title: "UI/UX Design Trends 2025: Immersive and Inclusive Experiences",
    slug: "ui-ux-design-2025",
    content: `# UI/UX Design Trends 2025: Immersive and Inclusive Experiences

2025 UI/UX focuses on AR integrations, accessibility, and personalization. Tools like Figma with AI plugins accelerate design.

## Micro-Interactions and Animations
Subtle animations enhance usability. Use Framer Motion in React.

\`\`\`jsx
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
\`\`\`

## Inclusive Design Principles
WCAG 3.0 compliance: alt text, keyboard nav, color contrast.

## Dark Mode and Theming
System-based theming with CSS variables.

\`\`\`css
:root {
  --bg-color: white;
}
@media (prefers-color-scheme: dark) {
  :root {
    --bg-color: black;
  }
}
\`\`\`

## Prototyping Tools
Figma, Adobe XD with VR previews.

## User Research Methods
AI sentiment analysis on feedback, A/B testing with Optimizely.

Design for delight. What's your 2025 trend prediction?

(Full article includes voice UI, neurodiversity considerations, and portfolio examples...)`,
    excerpt: "2025 UI/UX trends: micro-interactions, inclusivity, theming, tools, and research for creating immersive user experiences.",
    author: "Laura Kim",
    publishedAt: new Date("2025-05-15"),
    status: "published",
    tags: ["uiux-tag"],
    categories: ["UI/UX Design"],
    viewCount: 17800,
    createdAt: new Date("2025-05-10"),
    updatedAt: new Date("2025-05-15")
  },
  {
    title: "API Development Best Practices 2025: GraphQL vs REST Evolution",
    slug: "api-development-2025",
    content: `# API Development Best Practices 2025: GraphQL vs REST Evolution

APIs in 2025 blend REST with GraphQL federation. Focus on versioning, rate limiting, and OpenAPI specs for robust endpoints.

## RESTful Design
Use HTTP methods properly, HATEOAS for navigation.

\`\`\`js
app.get('/users/:id', (req, res) => {
  // Fetch user
  res.json(user);
});
\`\`\`

## GraphQL Implementation
Schema-first with Apollo Server. Resolvers for data fetching.

\`\`\`js
const typeDefs = gql\`
  type Query {
    user(id: ID!): User
  }
\`;
const resolvers = {
  Query: {
    user: (_, { id }) => getUser(id),
  },
};
\`\`\`

## Authentication and Security
OAuth 2.1, JWT. Protect against SQL injection, XSS.

## Performance Tuning
Caching with Redis, pagination for large datasets.

## Documentation and Testing
Swagger for docs, Postman for testing.

Evolve your APIs. GraphQL or REST—your pick?

(Full article covers gRPC alternatives, API gateways, and microservices APIs...)`,
    excerpt: "2025 API dev practices: REST/GraphQL, auth, performance, docs, and strategies for scalable, secure endpoints.",
    author: "David Nguyen",
    publishedAt: new Date("2025-04-20"),
    status: "published",
    tags: ["api-tag"],
    categories: ["API Development"],
    viewCount: 18900,
    createdAt: new Date("2025-04-15"),
    updatedAt: new Date("2025-04-20")
  },
  {
    title: "Cloud Computing Strategies 2025: Multi-Cloud and Serverless",
    slug: "cloud-computing-2025",
    content: `# Cloud Computing Strategies 2025: Multi-Cloud and Serverless

2025 cloud strategies emphasize multi-cloud to avoid lock-in, with serverless for cost efficiency. AWS, Azure, GCP dominate.

## Serverless Architectures
Use Lambda/Functions for event-driven apps.

\`\`\`js
exports.handler = async (event) => {
  // Process event
  return { statusCode: 200, body: 'Success' };
};
\`\`\`

## Multi-Cloud Management
Tools like Terraform for cross-provider IaC, Kubernetes for orchestration.

## Cost Optimization
Reserved instances, auto-scaling. Monitor with CloudWatch.

## Security in Cloud
IAM policies, encryption at rest/transit.

## Migration Best Practices
Lift-and-shift vs refactor. Use DMS for databases.

Strategize for agility. Multi-cloud experiences?

(Full article includes edge computing, FinOps, and hybrid cloud case studies...)`,
    excerpt: "2025 cloud strategies: serverless, multi-cloud, cost opt, security, and migration for flexible, efficient infrastructures.",
    author: "Sophia Martinez",
    publishedAt: new Date("2025-03-10"),
    status: "published",
    tags: ["cloud-tag"],
    categories: ["Cloud Computing"],
    viewCount: 20100,
    createdAt: new Date("2025-03-05"),
    updatedAt: new Date("2025-03-10")
  },
  {
    title: "Cybersecurity Essentials 2025: Zero-Trust and AI Threats",
    slug: "cybersecurity-2025",
    content: `# Cybersecurity Essentials 2025: Zero-Trust and AI Threats

Cybersecurity in 2025 combats AI-generated attacks with zero-trust models. Essentials include MFA, encryption, and threat hunting.

## Zero-Trust Implementation
Verify every access. Use Okta for identity.

\`\`\`js
// Middleware for auth
function authMiddleware(req, res, next) {
  if (!req.user) return res.status(401).send('Unauthorized');
  next();
}
\`\`\`

## AI-Powered Threats and Defenses
Detect deepfakes with ML models. Use SIEM with anomaly detection.

## Encryption Practices
TLS 1.3, quantum-resistant algos like Kyber.

## Incident Response
Playbooks with SOAR tools like Splunk.

## Compliance and Auditing
GDPR, SOC 2. Automate audits with scripts.

Fortify now. Your biggest threat vector?

(Full article covers ransomware trends, supply chain security, and ethical hacking tutorials...)`,
    excerpt: "2025 cybersecurity: zero-trust, AI threats/defenses, encryption, response, and compliance for robust protection.",
    author: "Chris Johnson",
    publishedAt: new Date("2025-02-15"),
    status: "published",
    tags: ["cybersecurity-tag"],
    categories: ["Cybersecurity"],
    viewCount: 21500,
    createdAt: new Date("2025-02-10"),
    updatedAt: new Date("2025-02-15")
  },
  {
    title: "React 18+ Hooks Deep Dive 2025: State Management Revolution",
    slug: "react-hooks-2025",
    content: `# React 18+ Hooks Deep Dive 2025: State Management Revolution

React in 2025 emphasizes concurrent features and hooks for efficient UIs. With React 19 on the horizon, mastering hooks like useTransition and useDeferredValue is crucial for smooth experiences.

## Custom Hooks Patterns
Build reusable logic with custom hooks. Encapsulate API calls or form handling.

\`\`\`tsx
import { useState, useEffect } from 'react';

function useFetch(url: string) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading };
}
\`\`\`

## Concurrent Mode
Use startTransition for non-urgent updates to prevent jank.

\`\`\`tsx
import { startTransition } from 'react';

function handleSearch(query: string) {
  startTransition(() => {
    setSearchQuery(query);
  });
}
\`\`\`

## State Management Alternatives
Zustand or Jotai for lightweight stores, Redux for complex apps.

## Performance Hooks
Memoize with useMemo and useCallback. Profile with React DevTools.

## Accessibility in Hooks
Ensure hooks handle focus management and ARIA attributes dynamically.

Level up your React game. Favorite hook?

(Full article covers server-side hooks, testing, and migration from class components...)`,
    excerpt: "2025 React hooks guide: custom patterns, concurrent mode, state tools, performance, and accessibility for modern UIs.",
    author: "Nina Patel",
    publishedAt: new Date("2025-01-05"),
    status: "published",
    tags: ["react-tag"],
    categories: ["React"],
    viewCount: 23000,
    createdAt: new Date("2024-12-30"),
    updatedAt: new Date("2025-01-05")
  },
  {
    title: "Mobile Development with React Native 2025: Cross-Platform Mastery",
    slug: "mobile-dev-react-native-2025",
    content: `# Mobile Development with React Native 2025: Cross-Platform Mastery

React Native in 2025 features Fabric renderer for better performance. Build iOS/Android apps with one codebase, integrating native modules seamlessly.

## Navigation Setup
Use React Navigation for stacks, tabs, and drawers.

\`\`\`tsx
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
\`\`\`

## State Management
Expo for easy setup, Redux or MobX for global state.

## Performance Optimization
Hermes engine, Flipper for debugging. Memoize components.

\`\`\`tsx
import { memo } from 'react';

const MemoizedComponent = memo(({ prop }) => <View>{prop}</View>);
\`\`\`

## Native Integrations
Bridge to Swift/Kotlin for custom modules.

## Deployment Strategies
App Store/Play Store submissions, OTA updates with CodePush.

Go mobile. Challenges in RN?

(Full article includes animations, testing, and AR/VR integrations...)`,
    excerpt: "2025 React Native mobile dev: navigation, state, perf, natives, and deployment for efficient cross-platform apps.",
    author: "Carlos Ramirez",
    publishedAt: new Date("2025-07-25"),
    status: "published",
    tags: ["mobile-tag", "reactnative-tag"],
    categories: ["Mobile Development"],
    viewCount: 16700,
    createdAt: new Date("2025-07-20"),
    updatedAt: new Date("2025-07-25")
  },
  {
    title: "Web3 Development Essentials 2025: Blockchain and DApps",
    slug: "web3-dev-2025",
    content: `# Web3 Development Essentials 2025: Blockchain and DApps

Web3 in 2025 focuses on layer-2 scaling and DeFi. Use Solidity for Ethereum, Rust for Solana.

## Smart Contract Basics
Deploy simple contracts with Hardhat.

\`\`\`solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Greeting {
  string public greet = "Hello Web3";

  function setGreet(string memory _greet) public {
    greet = _greet;
  }
}
\`\`\`

## Frontend Integration
Web3.js or ethers.js for wallet connections.

\`\`\`js
import { ethers } from 'ethers';

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
\`\`\`

## NFT and Token Standards
ERC-721 for NFTs, ERC-20 for tokens.

## Security Audits
Use Slither for static analysis, avoid reentrancy.

## Scaling Solutions
Polygon or Optimism for faster txns.

Enter Web3. Your first DApp idea?

(Full article covers DAOs, oracles, and metaverse builds...)`,
    excerpt: "2025 Web3 essentials: contracts, integrations, standards, security, and scaling for building decentralized apps.",
    author: "Aisha Khan",
    publishedAt: new Date("2025-08-15"),
    status: "published",
    tags: ["web3-tag", "blockchain-tag"],
    categories: ["Web3"],
    viewCount: 19400,
    createdAt: new Date("2025-08-10"),
    updatedAt: new Date("2025-08-15")
  },
  {
    title: "Testing Strategies for Modern Apps 2025: E2E and Beyond",
    slug: "testing-strategies-2025",
    content: `# Testing Strategies for Modern Apps 2025: E2E and Beyond

Testing in 2025 includes AI-assisted tests. Cover unit, integration, E2E with Jest, Cypress.

## Unit Testing with Jest
Mock dependencies for isolated tests.

\`\`\`ts
import { sum } from './math';

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
\`\`\`

## E2E with Cypress
Simulate user flows.

\`\`\`js
describe('Login', () => {
  it('successfully logs in', () => {
    cy.visit('/login');
    cy.get('input[name=username]').type('user');
    cy.get('input[name=password]').type('pass');
    cy.get('button[type=submit]').click();
    cy.url().should('include', '/dashboard');
  });
});
\`\`\`

## Integration Testing
API mocks with MSW, database seeding.

## Performance and Accessibility Testing
Lighthouse CI, axe-core.

## CI/CD Integration
Run tests in GitHub Actions.

Test thoroughly. Favorite testing tool?

(Full article includes mutation testing, contract testing, and AI test generation...)`,
    excerpt: "2025 testing strategies: unit, E2E, integration, perf/access, and CI for reliable modern applications.",
    author: "Brian Foster",
    publishedAt: new Date("2025-09-20"),
    status: "published",
    tags: ["testing-tag"],
    categories: ["Testing"],
    viewCount: 18200,
    createdAt: new Date("2025-09-15"),
    updatedAt: new Date("2025-09-20")
  },
  {
    title: "Advanced Next.js Patterns 2025: Server Actions and RSC",
    slug: "advanced-nextjs-2025",
    content: `# Advanced Next.js Patterns 2025: Server Actions and RSC

Next.js 15 in 2025 enhances React Server Components (RSC). Use server actions for mutations without APIs.

## Server Actions Implementation
Direct database ops from forms.

\`\`\`tsx
// app/actions.ts
'use server';

import { db } from '@/db';

export async function createPost(formData: FormData) {
  const title = formData.get('title');
  await db.post.create({ data: { title } });
}
\`\`\`

\`\`\`tsx
// app/page.tsx
<form action={createPost}>
  <input name="title" />
  <button>Submit</button>
</form>
\`\`\`

## RSC Best Practices
Fetch data server-side, pass to client.

## Internationalization
Next-intl for i18n.

## Edge Middleware
Rewrite requests dynamically.

## Analytics Integration
Vercel Analytics or custom.

Advance your Next.js skills. Advanced tip?

(Full article covers PPR, authentication, and e-commerce patterns...)`,
    excerpt: "2025 advanced Next.js: server actions, RSC, i18n, middleware, and analytics for sophisticated apps.",
    author: "Elena Vasquez",
    publishedAt: new Date("2025-10-05"),
    status: "published",
    tags: ["nextjs-tag"],
    categories: ["Next.js"],
    viewCount: 20900,
    createdAt: new Date("2025-10-01"),
    updatedAt: new Date("2025-10-05")
  },
  {
    title: "TypeScript in Node.js 2025: Typed Backend Development",
    slug: "typescript-node-2025",
    content: `# TypeScript in Node.js 2025: Typed Backend Development

Combine TypeScript with Node.js for safer servers. Use ts-node or esbuild for dev.

## Express with TS
Type routes and middleware.

\`\`\`ts
import express, { Request, Response } from 'express';

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello');
});

app.listen(3000);
\`\`\`

## ORM Integration
Prisma or TypeORM for typed DB interactions.

\`\`\`ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany();
}
\`\`\`

## Error Handling
Custom error types.

## Testing with TS
Supertest for API tests.

## Deployment
PM2 or Docker with TS configs.

Type your backend. Benefits seen?

(Full article includes async patterns, validation, and scaling...)`,
    excerpt: "2025 TS in Node.js: Express, ORMs, errors, testing, deployment for robust typed backends.",
    author: "Marcus Hale",
    publishedAt: new Date("2025-11-10"),
    status: "published",
    tags: ["typescript-tag", "nodejs-tag"],
    categories: ["TypeScript", "Node.js"],
    viewCount: 17600,
    createdAt: new Date("2025-11-05"),
    updatedAt: new Date("2025-11-10")
  },
  {
    title: "MongoDB with AI 2025: Vector Search Applications",
    slug: "mongodb-ai-2025",
    content: `# MongoDB with AI 2025: Vector Search Applications

MongoDB Atlas Search in 2025 powers AI apps with vector embeddings.

## Vector Index Setup
Store embeddings for similarity search.

\`\`\`js
db.collection.createSearchIndex({
  name: 'vector_index',
  definition: {
    mappings: { dynamic: true },
    analyzer: 'lucene.standard'
  }
});
\`\`\`

## Querying Vectors
$vectorSearch operator.

\`\`\`js
db.collection.aggregate([
  {
    $vectorSearch: {
      queryVector: embedding,
      path: 'embedding',
      numCandidates: 100,
      limit: 10
    }
  }
]);
\`\`\`

## Integration with ML Models
Hugging Face for embeddings.

## Scaling Vectors
Shard keys for distributed search.

## Use Cases
Recommendation systems, semantic search.

AI-ify your DB. Vector wins?

(Full article covers hybrid search, fine-tuning, and RAG patterns...)`,
    excerpt: "2025 MongoDB AI: vector indexes, queries, ML integrations, scaling for intelligent data apps.",
    author: "Tara Singh",
    publishedAt: new Date("2025-12-05"),
    status: "published",
    tags: ["mongodb-tag", "ai-tag"],
    categories: ["MongoDB", "AI & Machine Learning"],
    viewCount: 18800,
    createdAt: new Date("2025-12-01"),
    updatedAt: new Date("2025-12-05")
  },
  {
    title: "Web Performance in Mobile 2025: PWA Optimization",
    slug: "web-perf-mobile-2025",
    content: `# Web Performance in Mobile 2025: PWA Optimization

Mobile web perf focuses on PWAs for app-like experiences.

## Service Workers for Offline
Cache assets.

\`\`\`js
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('v1').then(cache => {
      return cache.addAll(['/index.html', '/app.js']);
    })
  );
});
\`\`\`

## Lazy Loading Routes
Dynamic imports in frameworks.

## Network Optimization
Adaptive loading based on connection.

\`\`\`js
if (navigator.connection.saveData) {
  // Load low-res images
}
\`\`\`

## Metrics Monitoring
Web Vitals in mobile contexts.

## Push Notifications
Engage users offline.

Optimize for mobile. PWA success?

(Full article includes AMP, battery considerations, and benchmarks...)`,
    excerpt: "2025 mobile web perf: service workers, lazy, network opt, metrics for fast PWAs.",
    author: "Kevin Luo",
    publishedAt: new Date("2025-06-20"),
    status: "published",
    tags: ["performance-tag", "mobile-tag"],
    categories: ["Web Performance", "Mobile Development"],
    viewCount: 20300,
    createdAt: new Date("2025-06-15"),
    updatedAt: new Date("2025-06-20")
  },
  {
    title: "DevOps for Web3 2025: Decentralized CI/CD",
    slug: "devops-web3-2025",
    content: `# DevOps for Web3 2025: Decentralized CI/CD

DevOps meets Web3 with IPFS for deployments, blockchain for configs.

## CI/CD with GitHub Actions
Automate contract deploys.

\`\`\`yaml
name: Deploy Contract
on: [push]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npx hardhat deploy
\`\`\`

## Monitoring DApps
Prometheus for chain metrics.

## Infrastructure
AWS Blockchain or self-hosted nodes.

## Security Pipelines
Automated audits in CI.

## Decentralized Storage
Pinata for IPFS pinning.

DevOps decentralized. Tools?

(Full article covers DAOs ops, zero-downtime, and hybrid clouds...)`,
    excerpt: "2025 Web3 DevOps: CI/CD, monitoring, infra, security for decentralized app delivery.",
    author: "Olivia Grant",
    publishedAt: new Date("2025-05-25"),
    status: "published",
    tags: ["devops-tag", "web3-tag"],
    categories: ["DevOps", "Web3"],
    viewCount: 17100,
    createdAt: new Date("2025-05-20"),
    updatedAt: new Date("2025-05-25")
  },
  {
    title: "UI/UX in Testing 2025: User-Centric Validation",
    slug: "uiux-testing-2025",
    content: `# UI/UX in Testing 2025: User-Centric Validation

Integrate UI/UX with testing for better user flows.

## Visual Regression Testing
Percy or BackstopJS for snapshots.

\`\`\`js
// Percy example
cy.percySnapshot('Homepage');
\`\`\`

## Usability Testing
Heatmaps with Hotjar.

## A/B Testing Frameworks
Optimizely integrations.

\`\`\`js
if (variant === 'A') {
  // Render A
} else {
  // Render B
}
\`\`\`

## Accessibility Audits
Automated with pa11y.

## Feedback Loops
In-app surveys.

Test for users. UX wins?

(Full article covers prototypes testing, metrics, and agile UX...)`,
    excerpt: "2025 UI/UX testing: visual reg, usability, A/B, access, feedback for user-focused validation.",
    author: "Derek Wong",
    publishedAt: new Date("2025-04-10"),
    status: "published",
    tags: ["uiux-tag", "testing-tag"],
    categories: ["UI/UX Design", "Testing"],
    viewCount: 19700,
    createdAt: new Date("2025-04-05"),
    updatedAt: new Date("2025-04-10")
  }
];

// Export the posts array
export default posts;