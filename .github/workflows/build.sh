echo "Pergi ke folder frontend"
cd /home/dev/Web/frontend

echo "Menginstall dependencies"
rm -rf package-lock.json
sudo npm install

echo "Build Halaman"
sudo npm run build

echo "Restart Server"
sudo pm2 restart frontend
