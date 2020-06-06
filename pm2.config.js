// 名称任意，按照个人习惯来
module.exports = {
	apps: [
		{
			name: 'api', // 博客后端
			script: './app/index.js', // 启动文件地址
			cwd: './', // 当前工作路径
			watch: [
			// 监控变化的目录，一旦变化，自动重启
				'app',
				'build',
			],
			ignore_watch: [
			// 忽视这些目录的变化
				'node_modules',
				'logs',
				'public',
			],
			node_args: '--harmony', // node的启动模式
			env: {
				NODE_ENV: 'production', // 设置运行环境，此时process.env.NODE_ENV的值就是development
				// ORIGIN_ADDR: 'https://www.antcp.com'
			},
			env_production: {
				NODE_ENV: 'production',
			},
			out_file: './logs/out.log', // 普通日志路径
			error_file: './logs/err.log', // 错误日志路径
			merge_logs: true,
			log_date_format: 'YYYY-MM-DD HH:mm Z',
		},
		{
			name: 'admin-template', // 前端中后台模版
			script: './admin-template/index.js', // 启动文件地址
			cwd: './', // 当前工作路径
			watch: [],
			ignore_watch: [
			// 忽视这些目录的变化
				'node_modules',
				'logs',
				'public',
			],
			node_args: '--harmony', // node的启动模式
			env: {
				NODE_ENV: 'production', // 设置运行环境，此时process.env.NODE_ENV的值就是development
				// ORIGIN_ADDR: 'https://www.antcp.com'
			},
			env_production: {
				NODE_ENV: 'production',
			},
			out_file: './logs/out.log', // 普通日志路径
			error_file: './logs/err.log', // 错误日志路径
			merge_logs: true,
			log_date_format: 'YYYY-MM-DD HH:mm Z',
		},
		{
			name: 'saas-vue', // saas-vue
			script: './saas/index.js', // 启动文件地址
			cwd: './', // 当前工作路径
			watch: [],
			ignore_watch: [
			// 忽视这些目录的变化
				'node_modules',
				'logs',
				'public',
			],
			node_args: '--harmony', // node的启动模式
			env: {
				NODE_ENV: 'production', // 设置运行环境，此时process.env.NODE_ENV的值就是development
				// ORIGIN_ADDR: 'https://www.antcp.com'
			},
			env_production: {
				NODE_ENV: 'production',
			},
			out_file: './logs/out.log', // 普通日志路径
			error_file: './logs/err.log', // 错误日志路径
			merge_logs: true,
			log_date_format: 'YYYY-MM-DD HH:mm Z',
		},
		{
			name: 'test', // 测试
			script: './test/index.js', // 启动文件地址
			cwd: './', // 当前工作路径
			watch: [],
			ignore_watch: [
			// 忽视这些目录的变化
				'node_modules',
				'logs',
				'public',
			],
			node_args: '--harmony', // node的启动模式
			env: {
				NODE_ENV: 'production', // 设置运行环境，此时process.env.NODE_ENV的值就是development
				// ORIGIN_ADDR: 'https://www.antcp.com'
			},
			env_production: {
				NODE_ENV: 'production',
			},
			out_file: './logs/out.log', // 普通日志路径
			error_file: './logs/err.log', // 错误日志路径
			merge_logs: true,
			log_date_format: 'YYYY-MM-DD HH:mm Z',
		},
	],
};
  