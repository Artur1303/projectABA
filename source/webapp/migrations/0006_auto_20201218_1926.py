# Generated by Django 2.2.13 on 2020-12-18 13:26

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('webapp', '0005_auto_20201217_2211'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='session',
            options={'verbose_name': 'Сессия', 'verbose_name_plural': 'Сессии'},
        ),
        migrations.AlterModelOptions(
            name='sessionskill',
            options={'verbose_name': 'Навыки для отработки', 'verbose_name_plural': 'Навыки для отработки'},
        ),
    ]
