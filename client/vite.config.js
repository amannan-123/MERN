import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	//add proxy for backend
	server: {
		proxy: {
			"/api": {
				target: "http://backend:5000",
				changeOrigin: true,
				//log events
				onProxyReq: (proxyReq, req, res) => {
					console.log("proxying", req.url);
				},
			},
		},
		//strict port to 5173
		host: true,
		strictPort: true,
		port: 5173,
	},
});
