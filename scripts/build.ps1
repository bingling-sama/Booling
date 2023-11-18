echo "Starting build..."
git submodule update
pnpm run --filter @booling/system.css css:build
echo "Submodule build successful."
vue-tsc
vite build
echo "Build successful."