root = "/home/www/apps/oa/current"
working_directory root
pid "#{root}/tmp/pids/unicorn_oa.pid"
stderr_path "#{root}/log/unicorn_oa.stderr.log"
stdout_path "#{root}/log/unicorn_oa.log"

listen "/tmp/unicorn_oa.sock"
worker_processes 3
timeout 30
#preload_app true
