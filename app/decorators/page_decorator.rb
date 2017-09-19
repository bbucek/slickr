class PageDecorator < Draper::Decorator
  delegate_all

  def versions_for_views
    versions.map do |v|
      v.changeset.map do |key, value|
        {
          whodunnit: v.actor.name,
          date: v.created_at,
          change: change_translation(key, value, v.actor.name)
        }
      end
    end
  end

  def children
    tree_children
  end

  def subtitle
    "Current layout: #{layout}, #{drafts.count} Drafts"
  end

  protected

  def change_translation(key, value, actor)
    case key.to_sym
    when :aasm_state
      h.t("#{value[0]}_#{value[1]}".to_sym, scope: [:activerecord, :models, :page, :versions, key.to_sym], actor: actor)
    else
      h.t(key.to_sym, scope: [:activerecord, :models, :page, :versions], actor: (actor || "Unknown"))
    end

  end
  # Define presentation-specific methods here. Helpers are accessed through
  # `helpers` (aka `h`). You can override attributes, for example:
  #
  #   def created_at
  #     helpers.content_tag :span, class: 'time' do
  #       object.created_at.strftime("%a %m/%d/%y")
  #     end
  #   end

end
