# Generated by Django 3.1.7 on 2021-04-29 18:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0006_forms_anonymous_response'),
    ]

    operations = [
        migrations.CreateModel(
            name='AnonymousUser',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_deleted', models.BooleanField(default=False)),
            ],
        ),
    ]
