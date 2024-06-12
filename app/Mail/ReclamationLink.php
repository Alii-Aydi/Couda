<?php

namespace App\Mail;

use App\Models\Reclamation;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ReclamationLink extends Mailable
{
    use Queueable, SerializesModels;

    public $reclamation;

    /**
     * Create a new message instance.
     *
     * @param Reclamation $reclamation
     */
    public function __construct(Reclamation $reclamation)
    {
        $this->reclamation = $reclamation;
    }

    /**
     * Get the message envelope.
     *
     * @return Envelope
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Reclamation Form Link'
        );
    }

    /**
     * Get the message content definition.
     *
     * @return Content
     */
    public function content(): Content
    {
        return new Content(
            view: 'Mails.Reclamation',
            with: [
                'reclamation' => $this->reclamation
            ]
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array
     */
    public function attachments(): array
    {
        return [];
    }
}
