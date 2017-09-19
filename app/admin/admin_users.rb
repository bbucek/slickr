ActiveAdmin.register AdminUser, as: "Users" do

  menu priority: 10
  permit_params :email, :password, :password_confirmation, :first_name, :last_name, :role

  scope :all, default: true
  scope("Authors") {|scope| scope.where(role: "author")}

  index do
    selectable_column
    id_column
    column :email
    column :current_sign_in_at
    column :sign_in_count
    column :created_at
    actions
  end

  show do
    render 'show'
    active_admin_comments
  end

  filter :email

  form do |f|
    f.inputs do
      f.input :email
      f.input :first_name
      f.input :last_name
      f.input :role, as: :select, collection: AdminUser::ROLES.map{|i| [i.to_s.humanize, i]} if current_admin_user.admin?
      f.input :password
      f.input :password_confirmation
    end
    f.actions
  end

  controller do
    def update
      if params[:admin_user][:password].blank? && params[:admin_user][:password_confirmation].blank?
        params[:admin_user].delete('password')
        params[:admin_user].delete('password_confirmation')
      end
      update! do |format|
        format.html { redirect_to edit_admin_admin_user_path(resource), notice: 'User updated' }
      end
    end
  end

end
