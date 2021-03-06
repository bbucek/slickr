class Ability
  include CanCan::Ability

  def initialize(user)
    user ||= AdminUser.new

    if user.admin?
      can :manage, :all
    elsif user.editor?
      can :manage, AdminUser, id: user.id
    elsif user.author?
      can :manage, Page
      cannot :publish, Page
      cannot :unpublish, Page
    end

    # NOTE: Everyone can read the page of Permission Deny
    can :read, ActiveAdmin::Page, name: "Dashboard"
  end
end
