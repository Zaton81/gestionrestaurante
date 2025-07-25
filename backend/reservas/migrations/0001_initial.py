# Generated by Django 5.2.4 on 2025-07-13 13:58

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('empleados', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Mesa',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('numero', models.PositiveIntegerField(unique=True, verbose_name='Número de Mesa')),
                ('capacidad', models.PositiveIntegerField(verbose_name='Capacidad (Comensales)')),
                ('disponible', models.BooleanField(default=True, verbose_name='Disponible')),
                ('ubicacion', models.CharField(blank=True, max_length=100, null=True, verbose_name='Ubicación')),
                ('activa', models.BooleanField(default=True, verbose_name='Mesa Activa')),
            ],
            options={
                'verbose_name': 'Mesa',
                'verbose_name_plural': 'Mesas',
                'ordering': ['numero'],
            },
        ),
        migrations.CreateModel(
            name='Reserva',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre_cliente', models.CharField(max_length=200, verbose_name='Nombre del Cliente')),
                ('email_cliente', models.EmailField(max_length=254, verbose_name='Email del Cliente')),
                ('telefono_cliente', models.CharField(max_length=15, verbose_name='Teléfono del Cliente')),
                ('fecha', models.DateField(verbose_name='Fecha')),
                ('hora', models.TimeField(verbose_name='Hora')),
                ('numero_personas', models.PositiveIntegerField(verbose_name='Número de Personas')),
                ('estado', models.CharField(choices=[('PENDIENTE', 'Pendiente de Confirmación'), ('CONFIRMADA', 'Confirmada'), ('CANCELADA', 'Cancelada'), ('COMPLETADA', 'Completada')], default='PENDIENTE', max_length=20, verbose_name='Estado')),
                ('creada_en', models.DateTimeField(auto_now_add=True, verbose_name='Fecha de Creación')),
                ('modificada_en', models.DateTimeField(auto_now=True, verbose_name='Última Modificación')),
                ('notas', models.TextField(blank=True, null=True, verbose_name='Notas Adicionales')),
                ('confirmada_por', models.CharField(blank=True, max_length=100, null=True, verbose_name='Confirmada Por')),
                ('empleado_asignado', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='empleados.empleado', verbose_name='Empleado Asignado')),
                ('mesa', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='reservas.mesa', verbose_name='Mesa')),
            ],
            options={
                'verbose_name': 'Reserva',
                'verbose_name_plural': 'Reservas',
                'ordering': ['-fecha', '-hora'],
            },
        ),
    ]
