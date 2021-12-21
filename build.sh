echo "Pergi ke folder frontend"
cd /home/dev/Web/frontend

echo "Menginstall dependencies"
rm -rf package-lock.json
npm install

echo "Build Halaman"
npm run build

echo "Restart Server"
pm2 restart frontend

echo "selesai"
