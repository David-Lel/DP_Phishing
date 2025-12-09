from flask import Flask, jsonify
from flask_cors import CORS

# 1. Vytvoření instance "aplikace" (serveru)
app = Flask(__name__)

# 2. Nastavení CORS
# Toto říká: "Povol komukoliv (origins='*') posílat požadavky na cokoliv, 
# co začíná /api/." Pro testování je to ideální.
CORS(app, resources={r"/api/*": {"origins": "*"}})

# 3. Vytvoření našeho prvního "API endpointu"
# Toto říká: "Když někdo přijde na adresu http://localhost:5000/api/test..."
@app.route('/api/test', methods=['GET'])
def test_endpoint():
    # "...spusť tuto funkci a vrať následující data jako JSON."
    print("Požadavek na /api/test dorazil!")
    
    # Data pro test
    data = {
        "message": "Ahoj! Zpráva dorazila úspěšně z backendu (z Pythonu)!"
    }
    
    # Vrátíme je pomocí 'jsonify'
    return jsonify(data)

# 4. Spuštění serveru
# Toto se spustí jen tehdy, když skript pustíme přímo (ne při importu)
if __name__ == '__main__':
    # Spustí server na portu 5000 a zapne 'debug' mód 
    # (server se sám restartuje, když změníš kód)
    app.run(port=5000, debug=True)