from werkzeug.security import generate_password_hash, check_password_hash

# Contraseña de ejemplo
contraseña = "miClaveSegura123"

print("=== DEMOSTRACIÓN SIMPLE DE WERKZEUG.SECURITY ===")
print(f"Contraseña original: {contraseña}")

# 1. Generar el hash
hash_generado = generate_password_hash(contraseña)
print(f"\nHash generado: {hash_generado}")

# 2. Verificar contraseña correcta
if check_password_hash(hash_generado, contraseña):
    print("\n✅ Verificación EXITOSA con la contraseña correcta")
else:
    print("\n❌ Falla en la verificación (esto no debería ocurrir)")

# 3. Verificar contraseña incorrecta
if check_password_hash(hash_generado, "claveIncorrecta"):
    print("\n❌ Verificación exitosa con contraseña incorrecta (esto sería malo)")
else:
    print("\n✅ Correcto: La contraseña incorrecta no verifica")