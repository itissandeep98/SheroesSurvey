# Generated by Django 3.2 on 2021-05-02 14:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0010_auto_20210430_0031'),
    ]

    operations = [
        migrations.AddField(
            model_name='questions',
            name='other_ques_params',
            field=models.JSONField(default=dict),
        ),
        migrations.AddField(
            model_name='shortpara',
            name='max_val',
            field=models.FloatField(default=100, null=True),
        ),
        migrations.AddField(
            model_name='shortpara',
            name='min_val',
            field=models.FloatField(default=0, null=True),
        ),
        migrations.AlterField(
            model_name='forms',
            name='edit_response_toggle',
            field=models.BooleanField(default=True),
        ),
    ]
