<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Reclamation Form Link</title>
    <style>
        body {
            background-color: #f7fafc;
            padding: 20px;
            font-family: Arial, sans-serif;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            overflow: hidden;
        }

        .header {
            padding: 20px;
            background-color: #f1f1f1;
            border-bottom: 1px solid #e2e2e2;
        }

        .header h1 {
            font-size: 24px;
            color: #333333;
            margin-bottom: 10px;
        }

        .content {
            padding: 20px;
        }

        .content p {
            color: #555555;
            margin-bottom: 20px;
        }

        .content a {
            display: inline-block;
            background-color: #1d4ed8;
            color: #ffffff;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            transition: background-color 0.3s;
        }

        .content a:hover {
            background-color: #1e40af;
        }

        .section {
            margin-top: 20px;
        }

        .section h2 {
            font-size: 20px;
            color: #333333;
            margin-bottom: 10px;
        }

        .section p {
            color: #555555;
            margin-bottom: 10px;
        }

        .section ul {
            list-style-type: disc;
            padding-left: 20px;
        }

        .section ul li {
            color: #555555;
            margin-bottom: 5px;
        }

        .footer {
            padding: 20px;
            background-color: #f1f1f1;
            border-top: 1px solid #e2e2e2;
            text-align: center;
        }

        .footer p {
            color: #555555;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <h1>Lien vers le formulaire de réclamation</h1>
        </div>

        <div class="content">
            <p>Cliquez sur le lien ci-dessous pour accéder au formulaire de réclamation :</p>
            <a href="{{ url('dashboard/reclamation/form/' . $reclamation->id . '?token=' . $reclamation->token) }}">Accéder
                Formulaire de réclamation</a>
        </div>

        <div class="content section">
            <h2>Reclamation Details</h2>
            <div class="section">
                <h3>Informations sur le dossier fiscal</h3>
                <p>CIN/Num Fiscal: {{ $reclamation->fiscalFile->cin_or_fiscal_number }}</p>
                <p>Nom: {{ $reclamation->fiscalFile->name }}</p>
            </div>

            <div class="section">
                <h3>Attributes et Reasons</h3>
                <ul>
                    @foreach ($reclamation->attributesReclamations as $attribute)
                        <li><strong>{{ $attribute->attribute }}</strong>: {{ $attribute->reason }}</li>
                    @endforeach
                </ul>
            </div>

            <div class="section">
                <h3>Documents</h3>
                <ul>
                    @foreach ($reclamation->reportsReclamations as $report)
                        <li><strong>{{ $report->name }}</strong>: {{ $report->description }}</li>
                    @endforeach
                </ul>
            </div>
        </div>

        <div class="footer">
            <p>&copy; {{ date('Y') }} Minester de finance. All rights reserved.</p>
        </div>
    </div>
</body>

</html>
