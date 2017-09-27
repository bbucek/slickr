set :stage, :production

domain = "http://cms.canneroni.com"

role :web, domain
role :app, domain
role :db, domain, :privacy => true, :primary => true
role :resque_worker, domain
role :resque_scheduler, domain

# server 'example.com', user: 'deploy', roles: %w{web app}, my_property: :my_value

set :branch, "master"
set :user, "deployer"
set :use_sudo, false

# rails specific
set :rails_env, "production"
set :deploy_to, "/var/www/production/cms"
set :linked_files, fetch(:linked_files)
set :ssh_options, {
  user: 'deployer',
  keys: %w(/Users/bart/.ssh/id_rsa /Users/bartlomiejoleszczyk/.ssh/id_rsa /Users/gordonmclachlan/.ssh/id_rsa C:\Users\Gordon\.ssh\id_rsa /Users/freelance2/.ssh/id_rsa /home/piotrek/.ssh/id_rsa /Users/primate/.ssh/id_rsa),
  forward_agent: true,
  port: 30000
}

# after "deploy:updated", "deploy:symlink_secret"
before "bundler:install", "bundler:config_update"

namespace :bundler do
  desc 'Set bundler variables'
  task :config_update do
    on roles(:web) do
      execute "bundle config build.pg --with-pg-config=/usr/pgsql-9.3/bin/pg_config"
    end
  end
end
