# Generated by Django 2.2.13 on 2021-01-24 14:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('webapp', '0012_homework'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='homework',
            options={'ordering': ['-created_date'], 'verbose_name': 'Домашнее задание', 'verbose_name_plural': 'Домашнии задания'},
        ),
    ]
