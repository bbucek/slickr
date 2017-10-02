class AdminUser < ApplicationRecord
  mount_uploader :avatar, AvatarUploader
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable,
         :recoverable, :rememberable, :trackable, :validatable
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :event_logs
  ROLES = [:admin, :editor, :author, :contributor]

  def display_name
    first_name || email
  end

  def full_name
    [first_name, last_name].join(" ")
  end

  def admin?
    role == 'admin'
  end

  def editor?
    role == 'editor'
  end

  def author?
    role == 'author'
  end
end
