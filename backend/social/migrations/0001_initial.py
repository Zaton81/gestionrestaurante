# Generated by Django 5.2.4 on 2025-07-19 15:52

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='SocialLink',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=50, verbose_name='Nombre')),
                ('tipo', models.CharField(choices=[('facebook', 'Facebook'), ('instagram', 'Instagram'), ('twitter', 'Twitter'), ('whatsapp', 'WhatsApp'), ('tiktok', 'TikTok'), ('maps', 'Google Maps'), ('web', 'Web'), ('otro', 'Otro')], max_length=20, verbose_name='Tipo de Red')),
                ('url', models.URLField(verbose_name='Enlace')),
                ('icono', models.CharField(blank=True, max_length=50, null=True, verbose_name='Clase de icono (opcional)')),
                ('visible', models.BooleanField(default=True, verbose_name='Visible')),
                ('orden', models.PositiveIntegerField(default=0, verbose_name='Orden de aparición')),
            ],
            options={
                'verbose_name': 'Enlace social',
                'verbose_name_plural': 'Enlaces sociales',
                'ordering': ['orden', 'tipo'],
            },
        ),
    ]
