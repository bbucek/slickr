set :stage, :production
set :branch, "react-version"
set :deploy_to, '/var/www/production/cms'

role :app, %w{cms.canneroni.com}
role :web, %w{cms.canneroni.com}
role :db,  %w{cms.canneroni.com}

set :rails_env, 'production'
# server-based syntax
# ======================
# Defines a single server with a list of roles and multiple properties.
# You can define all roles on a single server, or split them:


server 'cms.canneroni.com', user: 'deployer', roles: %w{web app}
# set :linked_files, fetch(:linked_files, []).push('config/mongoid.yml')

set :ssh_options, {
  user: 'deployer',
  keys: %w(/Users/christopherlamb/.ssh/id_rsa  /Users/bart/.ssh/id_rsa /Users/Alkistis/.ssh/id_rsa /home/dragomir/.ssh/id_rsa /Users/bartlomiejoleszczyk/.ssh/id_rsa /Users/gordonmclachlan/.ssh/id_rsa C:\Users\Gordon\.ssh\id_rsa /Users/freelance2/.ssh/id_rsa /home/piotrek/.ssh/id_rsa /Users/primate/.ssh/id_rsa),
  forward_agent: false,
  port: 30000
}
set :assets_roles, [:web, :app]

# Defaults to 'assets'
# # This should match config.assets.prefix in your rails config/application.rb
#

set :passenger_restart_command, "touch #{deploy_to}/current/tmp/restart.txt"
set :passenger_restart_options, -> { "" }

# before "bundler:install", "bundler:config_update"
# before 'deploy:publishing', 'deploy:assets:sync'

before "bundler:install", "bundler:config_update"

namespace :bundler do
  desc 'Set bundler variables'
  task :config_update do
    on roles(:web) do
      execute "bundle config build.pg --with-pg-config=/usr/pgsql-9.6/bin/pg_config"
    end
  end
end
