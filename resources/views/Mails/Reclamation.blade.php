<!DOCTYPE html>
<html>

<head>
    <title>Reclamation Form Link</title>
</head>

<body>
    <h1>Reclamation Form Link</h1>
    <p>Click the link below to access the reclamation form:</p>
    <a href="{{ url('dashboard/reclamation/form/' . $reclamation->id . '?token=' . $reclamation->token) }}">Access
        Reclamation
        Form</a>
</body>

</html>
