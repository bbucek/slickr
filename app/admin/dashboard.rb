ActiveAdmin.register_page "Dashboard" do

  menu priority: 1, label: proc{ I18n.t("active_admin.dashboard") }
  breadcrumb do
    []
  end

  content title: Proc.new { "Good morning, #{current_admin_user.first_name}!" } do
    render partial: 'dashboard'
  end
end
