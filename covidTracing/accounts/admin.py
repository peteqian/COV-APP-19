from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from accounts.models import Accounts




class AccountsAdmin(UserAdmin):
    list_display = ('email', 'first_name', 'last_name', 'is_admin')
    search_fields = ('email', 'first_name', 'last_name')

    filter_horizontal= ()
    ordering = ('email',)
    list_filter = ()
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name', 'phone_number')}),
        ('Permissions', {'fields': ('is_admin', 'is_staff', 'is_superuser', 'is_active', 'user_type')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'first_name', 'last_name', 'password1', 'password2')
        }),
    )

admin.site.register(Accounts, AccountsAdmin)