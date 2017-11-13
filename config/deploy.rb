# config valid only for current version of Capistrano
lock "3.8.2"

# set :scm, :git
# set :repo_url, "git@github.com:bbucek/slicker.git"
# set :format, :pretty
# set :pty, true
# set :keep_releases, 5

set :application, 'cms'
set :repo_url, "git@github.com:bbucek/slickr.git"

#SSHKit.config.command_map[:whenever] = "bundle exec whenever"
# set :log_level, :debug

set :linked_files, %w{config/database.yml config/secrets.yml}
set :linked_dirs, %w{log tmp/archives tmp/pids tmp/cache tmp/sockets vendor/bundle public/system public/uploads tmp/uploads}

# set :default_env, { path: "/opt/ruby/bin:$PATH" }

Rake::Task['deploy:assets:precompile'].clear

after 'deploy:publishing', 'deploy:restart'

namespace :deploy do
  namespace :assets do
    desc 'Compile assets'
    task :precompile => [:set_rails_env] do
      # invoke 'deploy:assets:precompile'
      invoke 'deploy:assets:precompile_local'
      invoke 'deploy:assets:backup_manifest'
    end

    desc "Precompile assets locally and then rsync to web servers"
    task :precompile_local do
      # compile assets locally
      run_locally do
        execute "RAILS_ENV=#{fetch(:stage)} bundle exec rake assets:precompile"
      end

      # rsync to each server
      dirs = {
        './public/assets/' => 'public/assets/',
        './public/packs/' => 'public/packs/'
      }
      on roles( fetch(:assets_roles, [:web]) ) do
        # this needs to be done outside run_locally in order for host to exist
        dirs.each do |local, remote|
          remote_dir = "#{host.user}@#{host.hostname}:#{release_path}/#{remote}"

          run_locally { execute "rsync -av -e 'ssh -p 30000' --delete #{local} #{remote_dir}" }
        end
      end

      # clean up
      run_locally { execute "rm -rf #{dirs.keys.first}" }
      run_locally { execute "rm -rf ./public/packs" }
    end
  end

  desc 'Restart application'
  task :restart do
    on roles(:app), in: :sequence, wait: 5 do
      # Your restart mechanism here, for example:
      execute :touch, release_path.join('tmp/restart.txt')
    end
  end

  after :restart, :clear_cache do
    on roles(:web), in: :groups, limit: 3, wait: 10 do
      # Here we can do anything such as:
      # within release_path do
      #   execute :rake, 'cache:clear'
      # end
    end
  end

  after :finishing, 'deploy:cleanup' do
  end
end

# Default branch is :master
# ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp

# Default deploy_to directory is /var/www/my_app_name
# set :deploy_to, "/var/www/my_app_name"

# Default value for :format is :airbrussh.
# set :format, :airbrussh

# You can configure the Airbrussh format using :format_options.
# These are the defaults.
# set :format_options, command_output: true, log_file: "log/capistrano.log", color: :auto, truncate: :auto

# Default value for :pty is false
# set :pty, true

# Default value for :linked_files is []
# append :linked_files, "config/database.yml", "config/secrets.yml"

# Default value for linked_dirs is []
# append :linked_dirs, "log", "tmp/pids", "tmp/cache", "tmp/sockets", "public/system"

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for local_user is ENV['USER']
# set :local_user, -> { `git config user.name`.chomp }

# Default value for keep_releases is 5
# set :keep_releases, 5
