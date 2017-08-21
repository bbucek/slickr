# module ActiveAdmin
#   # Add Google webfonts
#   module Views
#     module Pages
#       class Base < Arbre::HTML::Document
#         alias_method :original_build_head, :build_active_admin_head
#
#         def build_active_admin_head
#           original_build_head
#
#           within @head do
#             text_node google_webfonts_init({google: ['Roboto Slab', 'Roboto']})
#           end
#         end
#
#       end
#     end
#   end
# end
