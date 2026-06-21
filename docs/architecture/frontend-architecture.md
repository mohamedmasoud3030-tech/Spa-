# Frontend Architecture Blueprint

## Architectural Boundaries

We have explicitly transitioned towards a Clean Architecture bounded presentation layer, eliminating tight-coupling with UI mock state databases.

### 1. The Domain Layer (`src/domain/`)
- Contains purely theoretical abstractions of our system.
- `entities`: Definitive shapes of our business objects (e.g. `Appointment`, `Service`, `Customer`). Contains explicitly mapped interfaces instead of loose objects.
- `ports/repositories`: The structural interface definitions required to access system states, establishing `Result<T, E>` unions to provide functional error-handling behaviors.
- Does not import from framework levels (`react`).

### 2. The Application Layer (`src/application/`) *(Planned)*
- Orchestrates Use-Cases surrounding workflows (e.g. `CheckoutCart`, `OnboardStaff`).
- Operates primarily through interface bindings against implementations.

### 3. The Infrastructure Layer (`src/infrastructure/`)
- Houses the real Supabase adapter implementation used by v1.0.
- The next implementation PR must delete `src/infrastructure/preview/` and must throw an infrastructure error if any non-`supabase` backend is requested.

### 4. The Presentation Layer (`src/pages/`, `src/ui/`, `src/features/`)
- Houses the functional interface views, utilizing centralized accessors (`api`) to bridge context boundaries.
- Adheres to `RequireAuth` boundary logic verifying user session states (`empty`, `loading`, `error`, `authenticated`) before proceeding.
